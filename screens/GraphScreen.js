import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useEffect, useState, useImperativeHandle, forwardRef, useRef } from 'react'
import * as SQLite from 'expo-sqlite';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as weekStrings from '../asset/weekStrings.json';

const db = SQLite.openDatabase("db.db");
const GraphScreen = forwardRef((props, ref) => {
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

  useImperativeHandle(ref, () => ({

    callRefresh() { 
      refreshPageData()
    }
  }))

  const refreshPageData = () => {
    setWkString(weekStrings.weeks[wk])

    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM Weeks WHERE week=?`, [wk], (_, { rows }) => {
        console.log(JSON.stringify(rows._array))
        // Set 
        console.log(rows._array[0].total, rows._array[0].total / 3600000)
        const totalHR = Math.floor(rows._array[0].total / 3600000)
        const totalMin = Math.round((rows._array[0].total / 3600000 - totalHR) * 60)
        
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
    refreshGraph()
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

  const refreshGraph = () => {
    // Get sleep SQL data - Categorrise by t0 (probs more intuitive)
    setT0ByDay(prevState => ({mon:0, tue:0, wed:0, thu:0, fri:0, sat:0, sun:0}))
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM Sleeps WHERE week=?`, [wk], (_, { rows }) => {
        const itemsFromDB = rows._array
        for (const sleep of rows._array){
          console.log(sleep)
          const dateObj = new Date(sleep.t0)
          // Get day of t(0)
          if (dateObj.getDay() == 1) {
            setT0ByDay(prevState => {
              let newState = {
                ...prevState,
                mon: prevState.mon + (sleep.tn -sleep.t0)
              }
              return newState
            })
          } else if (dateObj.getDay() == 2) {
            setT0ByDay(prevState => {
              let newState = {
                ...prevState,
                tue: prevState.tue + (sleep.tn -sleep.t0)
              }
              return newState
            })
          } else if (dateObj.getDay() == 3) {
            setT0ByDay(prevState => {
              let newState = {
                ...prevState,
                wed: prevState.wed + (sleep.tn -sleep.t0)
              }
              return newState
            })
          } else if (dateObj.getDay() == 4) {
            setT0ByDay(prevState => {
              let newState = {
                ...prevState,
                thu: prevState.thu + (sleep.tn -sleep.t0)
              }
              return newState
            })
          } else if (dateObj.getDay() == 6) {
            setT0ByDay(prevState => {
              let newState = {
                ...prevState,
                fri: prevState.fri + (sleep.tn -sleep.t0)
              }
              return newState
            })
          } else if (dateObj.getDay() == 6) {
            setT0ByDay(prevState => {
              let newState = {
                ...prevState,
                sat: prevState.sat + (sleep.tn -sleep.t0)
              }
              return newState
            })
          } else if (dateObj.getDay() == 0) {
            setT0ByDay(prevState => {
              let newState = {
                ...prevState,
                sun: prevState.sun + (sleep.tn -sleep.t0)
              }
              return newState
            })
          }
        }
      })
    })

    // Then we have an OBJECT of 7 durations
    // calc heoght with uselayouteffect
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
    <View style={styles.graphContainer}></View>

    {/* DATA CONTAINER */}
    <View style={styles.dataContainer}>
      <View style={styles.dataTextContainer}>
        <Text style={styles.dataTextLeft}>Total Sleep: </Text>

        <View style={styles.rightContainer}>
          <Text style={styles.rightItemOne}>{totalHr}</Text>
          <Text style={styles.rightItemTwo}>{totalMin}</Text>
        </View>
      </View>
      <View style={styles.dataTextContainer}>
        <Text style={styles.dataTextLeft}>Week Average:</Text>
        <View style={styles.rightContainer}>
          <Text style={styles.rightItemOne}>{avgHr}</Text>
          <Text style={styles.rightItemTwo}>{avgMin}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => {logState()}}><Text>CALL</Text></TouchableOpacity>
      {/* <TouchableOpacity onPress={() => {deleteDb()}}><Text>DEL</Text></TouchableOpacity> */}

    </View>

    </View>
  )
})

const styles = StyleSheet.create({
  containsAll: {
    position: "relative",
    flex: 1,
    // backgroundColor: "rgb(40,40,40)"
  },

  graphContainer: {
    backgroundColor: "purple",
    height: 380,
    width: "100%",
    position:"absolute",
    bottom: 240,
  },

  dataContainer: {
    // backgroundColor: "blue",
    height: 120,
    width: "100%",
    position:"absolute",
    bottom: 120,
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
    fontSize: 18,
    letterSpacing: 0.2,
    color: 'rgb(180,180,180)',
  },
  rightContainer :{
    position: "relative"
  },
  rightItemOne:{
    fontSize: 18,
    color: 'rgb(180,180,180)',
    textAlign: "right",
    position:"absolute",
    right: 63,
  },
  rightItemTwo:{
    fontSize: 18,
    color: 'rgb(180,180,180)',
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
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "rgb(30,30,30)",
    height: 40,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
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