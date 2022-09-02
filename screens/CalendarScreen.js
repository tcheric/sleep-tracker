import { useEffect, useState, useImperativeHandle, forwardRef, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SQLite from 'expo-sqlite';
import * as weekStrings from '../asset/weekStrings.json';
import SleepItem from '../components/SleepItem.js'

const db = SQLite.openDatabase("db.db");

const CalendarScreen = forwardRef((props, ref) => {
  const [showSpinner, setShowSpinner] = useState("red")
  const [wk, setWk] = useState(()=>{
    // Calculate curent week
    const startOfUniverse = 1659276000000 // 1st Aug 2022 in milliseconds since epoch
    const weekInMilli = 604800000
    const nowMilli = new Date().getTime()
    const week = Math.floor((nowMilli - startOfUniverse) / weekInMilli)
    return week
  })
  const [wkString, setWkString] = useState("")
  const [items, setItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    refreshPageData()
  }, [wk])

  let deleting = 0

  useImperativeHandle(ref, () => ({
    callRefresh() {
      setWk(getCurrWeek)
    }
  }))

  useFocusEffect( 
    useCallback(() => {
      let isActive = true;
      if (isActive) {
        setWk(getCurrWeek)
        refreshPageData()
      }
      return () => {
        isActive = false;
      };
    }, [])
  );

  // Doesn't change week to currweek
  const refreshPageData = () => {
    setWkString(weekStrings.weeks[wk])

    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM Sleeps WHERE week=?`, [wk], (_, { rows }) => {
        const itemsFromDB = rows._array
        setItems(items => itemsFromDB)
        setIsLoaded(isLoaded => true)
        setShowSpinner("transparent")
      })
      tx.executeSql(`SELECT * FROM Weeks WHERE week=?`, [wk], (_, { rows }) => {
      })
    })
  }

  const deleteSleepItem = ( t0delete ) => {
    console.clear()
    if (deleting == 1) {
      return
    }
    deleting = 1

    let ogTotal
    let newTotal
    let newAverage
    let t0DelDurationMilli
    let t0DelWeek
    let t0DelHour
    let t0DelMin

    const nestedSelect = ( t0DelWeek, t0DelDurationMilli ) => {
      setShowSpinner("red")
      db.transaction((tx) => {
        tx.executeSql(`SELECT * FROM Weeks WHERE week=?`, [t0DelWeek],
        (_, {rows}) => {
          console.log("SELECT 2 SUCCESS:")
          ogTotal = rows._array[0].total
          newTotal = ogTotal - t0DelDurationMilli
          newAverage = newTotal / 7
          nestedUpdate( newTotal, newAverage, t0DelWeek)
        },
        (_, e) => {
          console.log("SELECT 2 ERROR:")
          console.log(e)
          console.log(t0DelWeek)
        })
      })
    }

    const nestedUpdate = ( newTotal, newAverage, t0DelWeek ) => {
      db.transaction((tx) => {
        tx.executeSql(`
            UPDATE Weeks 
            SET total = ?, average = ?
            WHERE week = ?
          ;`,  [newTotal, newAverage, t0DelWeek], (_, {rows}) => {
            console.log("UPDATE SUCCESS:")  
            console.log("newtotal", newTotal, "newavg", newAverage, "delweek", t0DelWeek)
            // console.log(rows)
            nestedDelete(t0delete)
          }, (_, e) => {
            console.log("UPDATE ERROR:")
            console.log(e)
          }
        )
      })
    }

    const nestedDelete = ( t0delete ) => {
      console.log("DELETE Sleeps")
      db.transaction((tx) => {
        tx.executeSql(`DELETE FROM Sleeps WHERE t0=?`, [t0delete],
        (t, r) => {
          console.log("DELETE SUCCESS:")
          console.log(r)
          // setWk(getCurrWeek)
          refreshPageData()
          deleting = 0
        },
        (t, e) => {
          console.log("DELETE ERROR:")
          console.log(e)
        })
      })
    }

    //SELECT ->  UPDATE week data: select from wweeks
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM Sleeps WHERE t0=?`, [t0delete], (_, {rows}) => {
        console.log("SELECT 1 SUCCESS:")
        try {
          t0DelWeek = rows._array[0].week
          t0DelHour = rows._array[0].hours
          t0DelMin = rows._array[0].minutes
          t0DelDurationMilli = t0DelHour *  3600000 + t0DelMin * 60000
          nestedSelect(t0DelWeek, t0DelDurationMilli)
        } catch (e) {
          console.log("SELECT 1 FAILED")
          return
        }
      },
      (_, e) => {
        console.log("SELECT 1 ERROR:")
        console.log(e)
      })
    })
  }

  const changeWeek = ( direction ) => {
    const currWeek = getCurrWeek()
    if (direction == "previous") {
      if (wk > 0) {
        setWk(wk => wk - 1)
        setShowSpinner("red")
      }
    } else if (direction == "next") {
      if (wk < currWeek) {
        setWk(wk => wk + 1)
        setShowSpinner("red")
      }
    }
  }

  const getCurrWeek = () => {
    const startOfUniverse = 1659276000000 // 1st Aug 2022 in milliseconds since epoch
    const weekInMilli = 604800000
    const nowMilli = new Date().getTime()
    return Math.floor((nowMilli - startOfUniverse) / weekInMilli)
  }

  return (
    <View style={styles.containsAll}>
      <View style={styles.redLine}></View>
      <ActivityIndicator style={styles.Lspinner} size="large" color={showSpinner} />
      <ActivityIndicator style={styles.Rspinner} size="large" color={showSpinner} />

      <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
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
{/*TEST ITEMS */}
        {!items.length && <Text style={styles.text} >NO SLEEPS</Text>}
        {isLoaded && items.map((item, index) => 
          <SleepItem
            key={item.t0}
            t0={item.t0}
            t0String={item.t0String}
            tnString={item.tnString}
            hours={item.hours}
            minutes={item.minutes}
            onDelete={deleteSleepItem}
          />
        )}
        {/* <SleepItem 
          t0={123}
          t0String={"item.t0String"}
          tnString={"item.tnString"}
          hours={5}
          minutes={0}
          onDelete={()=>{}}
        /> */}
          {/* <TouchableOpacity onPress={() => {refreshPageData()}}><Text>CALL</Text></TouchableOpacity> */}
        <View style={styles.endBar}></View>
      </ScrollView>
    </View>
  )
})

const styles = StyleSheet.create({
  containsAll: {
    position: "relative",
    backgroundColor: "green",
    flex: 1,
  },
  redLine: {
    width: "100%",
    backgroundColor: "red",
    height: 1,
    top: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  text: {
    color: 'red',
    marginBottom: 10,
    marginTop: 12,
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
  item: {
    width: "100%",
    height: 78,
    backgroundColor: "rgb(24, 21, 22)",
    color: "green",
    marginVertical: 10,
    paddingVertical: 8,
    paddingLeft: 8,
  },
  itemText: {
    marginHorizontal: 3,
    marginVertical: 0,
    fontSize: 15,
    letterSpacing: 0.2,
    color: 'rgb(180,180,180)',
  },
  delete: {
    position: "absolute",
    top: 18,
    right: 6,
  },
  endBar: {
    marginTop: 8,
    marginBottom: 120,
    backgroundColor: "rgb(25,25,25)",
    height: 4,
    width: 110,
    borderRadius: 10,
  },
  scroll: {
    justifyContent: "center",
    alignItems: "center",
  },
  Rspinner: {
    position: "absolute",
    top: 35,
    left: "50%",
    zIndex: 2,
    transform:[
      {translateX: 120},
      {translateY: -18},
    ]
  },
  Lspinner: {
    position: "absolute",
    top: 35,
    left: "50%",
    zIndex: 2,
    transform:[
      {translateX: -160},
      {translateY: -18},
    ]
  },
})

export default CalendarScreen