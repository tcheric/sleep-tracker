import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';
import openLocalDatabase from "../utils/openLocalDatabase";

import InputStart from "./InputStart";
import InputEnd from "./InputEnd";

const Stack = createNativeStackNavigator();
const db = SQLite.openDatabase("db.db");

const InputScreen = ({calRef, graphRef, navigation}) => {

  const [t0, setT0] = useState(0)
  const [flag, setFlag] = useState(0)
  const [t0String, setT0String] = useState("")
  const [t0AMPM, setT0AMPM] = useState("")
  const [t0DayOffset, setT0DayOffset] = useState(0)

  const startRef = useRef(null)
  const endRef = useRef(null)

  const addSleepEntry = ( startTime, endTime ) => {   
    insertIntoSleeps( startTime, endTime )
    updateWeeks( startTime, endTime )
    // deleteDb()
  }

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`
      CREATE TABLE IF NOT EXISTS Sleeps (
        t0 INTEGER PRIMARY KEY, 
        tn INTEGER, 
        t0String TEXT, 
        tnString TEXT, 
        hours INTEGER, 
        minutes INTEGER,
        week INTEGER
        );`, 
      [],
      (t, r) => {
        console.log("CREATE SUCCESS:")
        console.log(r)
      },
      (t, e) => {
        console.log("CREATE ERROR")
        console.log(e)
      })
      tx.executeSql(`
      CREATE TABLE IF NOT EXISTS Weeks (
        week INTEGER PRIMARY KEY, 
        total INTEGER, 
        average INTEGER, 
        startDate INTEGER,
        endDate INTEGER
        );`, 
      [],
      (t, r) => {
        console.log("CREATE SUCCESS:")
        console.log(r)
      },
      (t, e) => {
        console.log("CREATE ERROR")
        console.log(e)
      })

      // Check if count weeks = 0
      tx.executeSql(`SELECT COUNT(*) FROM Weeks;`, 
      [],
      (t, r) => {
        console.log("SELECT SUCCESS:")
        // console.log(r.rows._array[0]["COUNT(*)"])
        if (r.rows._array[0]["COUNT(*)"] == 0) {
          const startOfUniverse = 1659276000000 // 1st Aug 2022 in milliseconds since epoch
          const weekInMilli = 604800000
          let newSD
          let newED
          for (let i = 0; i <= 73; i++) {
            newSD = startOfUniverse + i * weekInMilli
            newED = startOfUniverse + (i + 1) * weekInMilli - 1
            tx.executeSql(`
            INSERT INTO Weeks 
              ( week, total, average, startDate, endDate ) 
            VALUES 
              ( ?, ?, ?, ?, ?) 
            ;`, 
            [ i, 0, 0, newSD, newED ],
            (t, r) => {
              console.log("INSERT SUCCESS:")
              console.log(r)
            },
            (t, e) => {
              console.log("INSERT ERROR")
              console.log(e)
            })
          }
        }
      },
      (t, e) => {
        console.log("SELECT ERROR")
        console.log(e)
      })
    })
  }, [])

  const deleteDb = () => {
    db.closeAsync()
    db.deleteAsync()
      .then((res) => console.log("DROP SUCESS:", res))
      .catch((err) => console.log("DROP ERROR:",err))
  }

  const updateWeeks = ( startTime, endTime ) => {
    // Calculate week
    const startOfUniverse = 1659276000000 // 1st Aug 2022 in milliseconds since epoch
    const weekInMilli = 604800000
    const startInmilli = startTime.getTime()
    const week = Math.floor((startInmilli - startOfUniverse) / weekInMilli)

    // Calculate duration (milliseconds)
    const timeDiffMilli = endTime.getTime() - startTime.getTime()
    
    // GET Weeks - for original total and average values
    let ogTotal 
    let ogAverage 
    console.log("SELECT Weeks")

    db.transaction((tx) => {
      tx.executeSql(`SELECT total, average FROM Weeks WHERE week=?`, [week], (_, { rows }) => {
          console.log("SELECT SUCCESS:")
          // console.log(rows)
          // console.log(rows._array[0].total)
          ogTotal = rows._array[0].total
          ogAverage = rows._array[0].average
          const newTotal = ogTotal + timeDiffMilli
          const newAverage = newTotal / 7
          console.log("UPDATE Weeks")
          db.transaction((tx2) => {
            tx2.executeSql(`
              UPDATE Weeks 
              SET total = ?, average = ?
              WHERE week = ?
            ;`, 
            [newTotal, newAverage, week],
            (t, r) => {
              console.log("UPDATE SUCESS:")
              console.log(r)
            },
            (t, e) => {
              console.log("UPDATE ERROR:")
              console.log(e)
            })
          })
        },
        (t, e) => {
          console.log("SELECT ERROR:")
          console.log(e)
        }
      )
    })
  }

  const insertIntoSleeps = ( startTime, endTime ) => {
    // INSERT Sleeps( t0, tn, t0String, tnString, hours, minutes, week )
    // Calculate duration
    const timeDiffHours = (endTime.getTime() - startTime.getTime()) / 3600000
    const newMin = Math.round((timeDiffHours - Math.floor(timeDiffHours)) * 60)
    const newHours = Math.floor(timeDiffHours)

    // Calculate week
    const startOfUniverse = 1659276000000 // 1st Aug 2022 in milliseconds since epoch
    const weekInMilli = 604800000
    const startInmilli = startTime.getTime()
    const week = Math.floor((startInmilli - startOfUniverse) / weekInMilli)

    // T(0) and T(n)
    const newt0 = startTime.getTime()
    const newtn = endTime.getTime()

    // Calculate T(0) and T(n) strings
    const startDayString = calculateDay(startTime)
    const endDayString =  calculateDay(endTime)
    const startHourString = calculateHour(startTime)
    const endHourString = calculateHour(endTime)
    const startMinString = calculateMin(startTime)
    const endMinString = calculateMin(endTime)
    const startAMPMString = calculateAMPM(startTime)
    const endAMPMString = calculateAMPM(endTime)
    const startDateString = calculateDate(startTime)
    const endDateString = calculateDate(endTime)
    const newt0String = 
      `${startDayString} ${startHourString}:${startMinString}${startAMPMString} [${startDateString}]`
    const newtnString = 
      `${endDayString} ${endHourString}:${endMinString}${endAMPMString} [${endDateString}]` 

    console.log(newt0String, newtnString)
    console.log(newt0, newtn)
    console.log(newHours, newMin)
    console.log(week)

    console.log("INSERT Sleeps")
    console.log(newt0, newtn, newt0String, newtnString, newHours, newMin, week)

    db.transaction((tx) => {
      tx.executeSql(`
      INSERT INTO Sleeps 
        ( t0, tn, t0String, tnString, hours, minutes, week ) 
      VALUES 
        ( ?, ?, ?, ?, ?, ?, ? ) 
      ;`, 
      [newt0, newtn, newt0String, newtnString, newHours, newMin, week],
      (t, r) => {
        console.log("INSERT SUCCESS:")
        console.log(r)
        calRef.current.refreshPageData()
      },
      (t, e) => {
        console.log("INSERT ERROR:")
        console.log(e)
      })
    })
  }

  const calculateDate = ( time ) => {
    const dateInt = time.getDate()
    let dateString = dateInt.toString()
    if (dateInt < 10) {
      dateString = "0" + dateString
    }
    const monthInt = time.getMonth() + 1
    let monthString = monthInt.toString()
    if (monthInt < 10) {
      monthString = "0" + monthString
    }

    return dateString + "/" + monthString
  }

  const calculateAMPM = ( time ) => {
    const hourIndex = time.getHours()
    if (hourIndex < 12) {
      return "AM"
    } else {
      return "PM"
    }
  }

  const calculateDay = ( time ) => {
    const index = time.getDay()
    if (index == 1) return "MON"
    if (index == 2) return "TUE"
    if (index == 3) return "WED"
    if (index == 4) return "THU"
    if (index == 5) return "FRI"
    if (index == 6) return "SAT"
    if (index == 0) return "SUN"
  } 

  const calculateMin = ( time ) => {
    const minInt = time.getMinutes()
    let minString = minInt.toString()
    if (minInt < 10) {
      minString = "0" + minString
    }
    return minString
  }

  const calculateHour = ( time ) => {
    const hourIndex = time.getHours()
    if (hourIndex == 0) return "12"
    else if (hourIndex < 13) return hourIndex.toString()
    else return (hourIndex - 12).toString()
  }

  const handleStartSubmit = () => {
    console.log("t(0) submit pressed")
    let startDate = startRef.current.calculateDate()
    setT0(startDate)
    if (startDate != null) {
      // Pass AM/PM and dayoffset to inputend
      const t0Data = startRef.current.getAMPMDO()
      setT0AMPM(t0Data.t0AMPM)
      setT0DayOffset(t0Data.t0DO)

      navigation.navigate("Input", {screen: "End"})
      const min= startDate.getMinutes()
      const hour = startDate.getHours()
      const AMPMString = (hour >= 12) ? "PM" : "AM"
      const date = startDate.getDate()
      const month = startDate.getMonth() + 1
  
      let minString
      if (min < 10) {
        minString  = "0" + min.toString() 
      } else {
        minString = min.toString()
      }
  
      let hourString
      if (hour == 0) {
        hourString = "12"
      } else if (hour >= 13) {
        hourString = (hour - 12).toString()
      } else {
        hourString = hour.toString()
      }
      let dateString = (date < 10) ? ("0" + date.toString()) : date.toString()
      let monthString = (month < 10) ? ("0" + month.toString()) : month.toString()
  
      setT0String("T(0) : "+hourString+":"+minString+AMPMString+" ["+dateString+"/"+monthString+"]" )
    }
  }

  const handleEndSubmit = () => {
    console.log("t(n) submit pressed")
    let endDate = endRef.current.calculateDate()
    if (endDate == null) {
      return null
    }

    if (endDate.getTime() <= t0.getTime()) {
      alert("T(N) must be after T(0)")
      return null
    }

    if (endDate.getTime() - t0.getTime() > 43200000)  {
      alert("Sleep interval must be less than 12hr")
      return null
    }

    if (endDate != null) {
      navigation.navigate("Calendar")
    }
    addSleepEntry(t0, endDate)
    // alert("Sleep Saved")
    setFlag(1)
  }

  const flagFunc = () => {
    navigation.navigate("Input", {screen: "Start"}) //call this in parent
    setFlag(0)
    startRef.current.reset() // For resetting values after submitting
    graphRef.current.callRefresh()
  }

  return (
    <Stack.Navigator 
        screenOptions={{headerTitleAlign: 'center', animation: 'none'}}>
      <Stack.Screen
        name="Start"
        options={{
          title: "T(0)",
          headerStyle: {
            backgroundColor: 'rgb(25,25,25)',
            height: 100,
          },
          headerTitleStyle: {
            fontSize: 20,
            color: 'white',
          },
          headerRight: () => (
            <TouchableOpacity  onPress={()=>handleStartSubmit()} style={styles.icons}>
              <Ionicons name="chevron-forward-outline" 
                size={23} 
                color="white" 
              />
            </TouchableOpacity >
          ),
        }}
      >
        {() => <InputStart ref={startRef} />}
      </Stack.Screen>
      <Stack.Screen
        name="End"
        options={{
          title: "T(N)",
          headerStyle: {
            backgroundColor: 'rgb(25,25,25)',
            height: 100,
          },
          headerTitleStyle: {
            fontSize: 18,
            color: 'white',
          },
          headerLeft: () => (
            <TouchableOpacity  onPress={() => {navigation.navigate("Input", {screen: "Start"})}} style={styles.icons}>
              <Ionicons name="chevron-back-outline" 
                size={23} 
                color="white" 
              />
            </TouchableOpacity >
          ),
          headerRight: () => (
            <TouchableOpacity  onPress={()=>handleEndSubmit()} style={styles.icons}>
              <Ionicons name="checkmark-outline" 
                size={23} 
                color="white" 
              />
            </TouchableOpacity >
          ),
        }}
      >
        {() => <InputEnd
          ref={endRef}
          navigation={navigation}
          flag={flag}
          flagFunc={flagFunc}
          t0={t0String} 
          initAMPM={t0AMPM}
          initDO={t0DayOffset}/>}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  icons: {
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -2,
    marginHorizontal: -5,
    // backgroundColor: 'red',
  },

});

export default InputScreen