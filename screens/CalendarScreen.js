import { useEffect, useState, useImperativeHandle, forwardRef, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import openLocalDatabase from "../utils/openLocalDatabase";
import * as SQLite from 'expo-sqlite';
import * as weekStrings from '../asset/weekStrings.json';
import SleepItem from '../components/SleepItem.js'

const db = SQLite.openDatabase("db.db");

const CalendarScreen = forwardRef((props, ref) => {
  const [wk, setWk] = useState("")
  const [items, setItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  useImperativeHandle(ref, () => ({

    async getData() {
      // Calculate curent week
      const startOfUniverse = 1659276000000 // 1st Aug 2022 in milliseconds since epoch
      const weekInMilli = 604800000
      const nowMilli = new Date().getTime()
      const week = Math.floor((nowMilli - startOfUniverse) / weekInMilli)
  
      setWk(weekStrings.weeks[week])
  
      db.transaction((tx) => {
        tx.executeSql(`SELECT * FROM Sleeps WHERE week=?`, [week], (_, { rows }) => {
          // Get all sleeps in the current week
          const itemsFromDB = rows._array
          setItems(items => itemsFromDB)
          console.log("GET DATA SET IT")
          // USE UPDATER FUNCTION HERE TO RENDER THE ELEMENTS
          setIsLoaded(isLoaded => true)
        })
        tx.executeSql(`SELECT * FROM Weeks WHERE week=?`, [week], (_, { rows }) => {
          // console.log(JSON.stringify(rows._array))
        })
      })
      console.log(items)
    }
  }))

  const getData = async () => {
    // Calculate curent week
    const startOfUniverse = 1659276000000 // 1st Aug 2022 in milliseconds since epoch
    const weekInMilli = 604800000
    const nowMilli = new Date().getTime()
    const week = Math.floor((nowMilli - startOfUniverse) / weekInMilli)

    setWk(weekStrings.weeks[week])

    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM Sleeps WHERE week=?`, [week], (_, { rows }) => {
        // Get all sleeps in the current week
        const itemsFromDB = rows._array
        setItems(items => itemsFromDB)
        console.log("GET DATA SET IT")
        // USE UPDATER FUNCTION HERE TO RENDER THE ELEMENTS
        setIsLoaded(isLoaded => true)
      })
      tx.executeSql(`SELECT * FROM Weeks WHERE week=?`, [week], (_, { rows }) => {
        // console.log(JSON.stringify(rows._array))
      })
    })
    console.log(items)
  }

  return (
    <View style={styles.containsAll}>
      <View style={styles.redLine}></View>
      <ScrollView style={styles.container}>
  {/* DATE CONTAINER */}
        <View style={styles.dateContainer}>
          <TouchableOpacity 
            style={styles.icons} 
            onPress={() => {
              if (dayOffset <= 6) {
                setDayOffset(dayOffset + 1)
              }
            }}>
            <Ionicons name="chevron-back-outline" 
              size={20} 
              color="red"/>
          </TouchableOpacity >
          <Text style={styles.date}>{wk}</Text>
          <TouchableOpacity 
            style={styles.icons} 
            onPress={() => {
              if (dayOffset !== 0) {
                setDayOffset(dayOffset - 1)
              }
            }}>
            <Ionicons name="chevron-forward-outline" 
              size={20} 
              color="red"/>
              {/* color={(dayOffset === 0) ? "rgb(150,150,150)" : "red"}/> */}
          </TouchableOpacity >
        </View>
{/*TEST ITEMS */}
        {isLoaded && items.map((item, index) => 
          <SleepItem
            t0String={item.t0String}
            tnString={item.tnString}
            hours={item.hours}
            minutes={item.minutes}
          />
        )}

          <TouchableOpacity onPress={() => {getData()}}><Text>CALL</Text></TouchableOpacity>
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
  bar: {
    position: "absolute",
    top: 40,
    right: 62,
    backgroundColor: "rgb(50,50,50)",
    height: 1,
    width: 70,
  }
})

export default CalendarScreen