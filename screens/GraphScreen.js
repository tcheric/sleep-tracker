import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useEffect, useState, forwardRef, useCallback } from 'react'
import * as SQLite from 'expo-sqlite';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as weekStrings from '../asset/weekStrings.json';
import { useFocusEffect } from '@react-navigation/native';
import Graph from "../components/Graph";
import GraphSVG from "../components/GraphSVG";

const db = SQLite.openDatabase("db.db");
const GraphScreen = forwardRef((props, ref) => {
  const [graphData, setGraphData] = useState([
    { day: "Mo", hours: 0 },
    { day: "Tu", hours: 0 },
    { day: "We", hours: 0 },
    { day: "Th", hours: 0 },
    { day: "Fr", hours: 0 },
    { day: "Sa", hours: 0 },
    { day: "Su", hours: 0 },
  ])
  const [t0ByDay, setT0ByDay] = useState({mon:0, tue:0, wed:0, thu:0, fri:0, sat:0, sun:0})
  const [avgHr, setAvgHr] = useState("")
  const [avgMin, setAvgMin] = useState("")
  const [totalHr, setTotalHr] = useState("")
  const [totalMin, setTotalMin] = useState("")
  const [wkString, setWkString] = useState("")
  const [wk, setWk] = useState(()=>{
    // Calculate curent week
    const startOfUniverse = 1659276000000 // 1st Aug 2022 in milliseconds since epoch
    const weekInMilli = 604800000
    const nowMilli = new Date().getTime()
    const week = Math.floor((nowMilli - startOfUniverse) / weekInMilli)
    return week
  })

  useEffect(() => {
    refreshPageData()
  }, [wk])

  useFocusEffect( 
    useCallback(() => {
      let isActive = true;
      if (isActive) {
        console.log("RUN EFFECT")
        refreshPageData()
      }
       
      return () => {
        isActive = false;
      };
    }, [])
  );

  const refreshPageData = () => {
    console.log("REFRESH")
    refreshData()
    refreshGraph() 
  }

  const refreshData = () => {
    setWkString(weekStrings.weeks[wk])

    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM Weeks WHERE week=?`, [wk], (_, { rows }) => {
        const totalHR = Math.floor(rows._array[0].total / 3600000)
        const totalMin = Math.round((rows._array[0].total / 3600000 - totalHR) * 60)
        console.log(totalHR, totalMin)
        
        let avgHR
        let avgMin
        if (wk == getCurrWeek()) {
          const currDay =  new Date().getDay() // 0-6, 0 is Sunday
          if (currDay == 0) {
            avgHR = Math.floor((rows._array[0].total / 3600000) / 7)
            avgMin = Math.round(((rows._array[0].total / 3600000) / 7 - avgHR) * 60)
          } else {
            avgHR = Math.floor((rows._array[0].total / 3600000) / currDay)
            avgMin = Math.round(((rows._array[0].total / 3600000) / currDay - avgHR) * 60)
          }
        } else {
          avgHR = Math.floor(rows._array[0].average / 3600000)
          avgMin = Math.round((rows._array[0].average / 3600000 - avgHR) * 60)
        }
        // console.log(rows._array[0].average, rows._array[0].average / 3600000)
        setTotalHr(totalHR + " HR ")
        if (totalMin < 10) {
          setTotalMin("0" + totalMin + " MIN")
        } else {
          setTotalMin(totalMin + " MIN")
        }
        setAvgHr(avgHR + " HR ")
        if (avgMin < 10) {
          setAvgMin("0" + avgMin + " MIN")
        } else {
          setAvgMin(avgMin + " MIN")
        }
      })
    })
  }

  const refreshGraph = () => {
    // Get sleep SQL data - Categorrise by t0 (probs more intuitive)
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM Sleeps WHERE week=?`, [wk], (_, { rows }) => {
        const itemsFromDB = rows._array

        if (rows._array.length == 0) {
          console.log("No sleeps in week")
        }

        let graphDataObj = [
          { day: "Mo", hours: 0 },
          { day: "Tu", hours: 0 },
          { day: "We", hours: 0 },
          { day: "Th", hours: 0 },
          { day: "Fr", hours: 0 },
          { day: "Sa", hours: 0 },
          { day: "Su", hours: 0 },
        ]

        for (const sleep of rows._array){
          const dateObj = new Date(sleep.t0)

          // INSTEAD OF CALLING SETSTAE A BILLION TIMES< JUST MAKE THE OBJECT WITH FOR LOOP AND CALL SETSTATE ONCE
          const dayJS = dateObj.getDay()
          if (dayJS == 0) {
            graphDataObj[6].hours += Math.round((((sleep.tn -sleep.t0) / 3600000) * 10)) / 10
          } else {
            graphDataObj[dayJS - 1].hours += Math.round((((sleep.tn -sleep.t0) / 3600000) * 10)) / 10
          }
        }
        // console.log(graphDataObj)
        setGraphData(graphDataObj)
      })
    })
  }

  const getCurrWeek = () => {
    const startOfUniverse = 1659276000000 // 1st Aug 2022 in milliseconds since epoch
    const weekInMilli = 604800000
    const nowMilli = new Date().getTime()
    return Math.floor((nowMilli - startOfUniverse) / weekInMilli)
  }

  const changeWeek = ( direction ) => {
    const currWeek = getCurrWeek()
    if (direction == "previous") {
      if (wk > 0) {
        setWk(wk => wk - 1)
      }
    } else if (direction == "next") {
      if (wk < currWeek) {
        setWk(wk => wk + 1)
      }
    }
  }

  const deleteDb = () => {
    db.closeAsync()
    db.deleteAsync()
      .then((res) => console.log("DROP SUCESS:", res))
      .catch((err) => console.log("DROP ERROR:",err))
  }
  const logState = () => {
    console.log(t0ByDay)
  }
    
  return (
    <View style={styles.containsAll}>
      <View style={styles.redLine}></View>
      {/* DATE CONTAINER */}
      <View style={styles.dateContainer}>
        <TouchableOpacity 
          style={styles.icons} 
          onPress={() => changeWeek("previous")}>
          <Ionicons name="chevron-back-outline" 
            size={20} 
            color={(wk == 0) ? "rgb(50,50,50)" : "red"}/>
        </TouchableOpacity >
        <Text style={styles.date}>{wkString}</Text>
        <TouchableOpacity 
          style={styles.icons} 
          onPress={() => changeWeek("next")}>
          <Ionicons name="chevron-forward-outline" 
            size={20} 
            color={(wk == getCurrWeek()) ? "rgb(50,50,50)" : "red"}/>
        </TouchableOpacity >
      </View>

      {/* GRAPH CONTAINER */}
      <View style={styles.graphContainer}>
        <Graph data={graphData}></Graph>
        {/* <GraphSVG></GraphSVG> */}
      </View>

      {/* DATA CONTAINER */}
      <View style={styles.dataContainer}>
        <View style={styles.dataTextContainer}>
          <Text style={styles.dataTextLeft}>TOTAL SLEEP: </Text>

          <View style={styles.rightContainer}>
            <Text style={styles.rightItemOne}>{totalHr}</Text>
            <Text style={styles.rightItemTwo}>{totalMin}</Text>
          </View>
        </View>
        <View style={styles.dataTextContainer}>
          <Text style={styles.dataTextLeft}>WEEK AVERAGE:</Text>
          <View style={styles.rightContainer}>
            <Text style={styles.rightItemOne}>{avgHr}</Text>
            <Text style={styles.rightItemTwo}>{avgMin}</Text>
          </View>
        </View>

        {/* <TouchableOpacity onPress={() => {logState()}}><Text>CALL</Text></TouchableOpacity> */}
        {/* <Text>{graphData[0].hours} {graphData[1].hours} {graphData[2].hours} {graphData[3].hours}</Text> */}
        {/* <TouchableOpacity onPress={() => {deleteDb()}}><Text>RESET DB</Text></TouchableOpacity> */}

      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  containsAll: {
    position: "relative",
    flex: 1,
    backgroundColor: "rgb(24, 21, 22)",
    backgroundColor: "black"
  },

  graphContainer: {
    backgroundColor: "black",
    // backgroundColor: "rgb(30,30,30)",
    height: 400,
    width: "100%",
    position:"absolute",
    bottom: 210,
    paddingBottom: 20,
    // paddingHorizontal: 30,
  },

  dataContainer: {
    backgroundColor: "rgb(26,25,28)",
    // backgroundColor: "black",
    height: 90,
    width: "100%",
    position:"absolute",
    bottom: 125,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  dataTextContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent:"space-between",
  },
  dataTextLeft: {
    fontSize: 17,
    letterSpacing: 0.2,
    color: 'rgb(210,210,210)',
    // color: 'white',
    // fontFamily: "sans-serif-light"
  },
  rightContainer :{
    position: "relative"
  },
  rightItemOne:{
    fontSize: 17,
    color: 'rgb(210,210,210)',
    textAlign: "right",
    position:"absolute",
    right: 63,
  },
  rightItemTwo:{
    fontSize: 18,
    color: 'rgb(210,210,210)',
    textAlign: "right",
    position:"absolute", 
    right: 0,
  },

  text: {
    color: 'red',
  },
  redLine: {
    width: "100%",
    backgroundColor: "red",
    height: 1,
    top: 0,
  },
  dateContainer: {
    width: "60%",
    marginHorizontal: "20%",
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: "rgb(30,30,30)",
    height: 40,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    elevation: 0,
  },
  date: {
    fontSize: 16,
    marginHorizontal: 0,
    color: 'rgb(230,230,230)',
  },
  icons: {
    width: 36,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GraphScreen