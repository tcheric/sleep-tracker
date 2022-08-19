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

// var db
// openLocalDatabase()
//   .then((value) => {
//     db = value
//     console.log(db)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

const InputScreen = ({navigation}) => {

  const [t0, setT0] = useState(0)
  const [tn, setTn] = useState(0)
  const [flag, setFlag] = useState(0)
  const [t0String, setT0String] = useState("")


  const startRef = useRef(null)
  const endRef = useRef(null)

  const updateWeeks = ( startTime, endTime ) => {
    // UPDATE Weeks( week, stringRep, total, average, startDate, endDate ) 

    // Calculate week
    const startOfUniverse = 1659276000000 // 1st Aug 2022 in milliseconds since epoch
    const weekInMilli = 604800000
    const startInmilli = startTime.getTime()
    const week = Math.floor((startInmilli - startOfUniverse) / weekInMilli)

    // Calculate duration (milliseconds)
    const timeDiffMilli = endTime.getTime() - startTime.getTime()
    
    // GET Weeks - for original total and average values
    var ogTotal 
    var ogAverage 
    console.log("SELECT Weeks")
    db.transaction((tx) => {
      tx.executeSql(`SELECT total, average FROM Weeks WHERE week=?`, [week], (_, { rows }) => {
          // console.log(JSON.stringify(rows))
          // console.log(rows)
          ogTotal = rows._array[0].total
          ogAverage = rows._array[0].average
          // console.log(ogTotal, ogAverage)
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
              console.log("3rd r")
              console.log(r)
            },
            (t, e) => {
              console.log("3rd e")
              console.log(e)
            })
          })
        },
        (t, e) => {
          console.log("3.2nd e")
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

    openLocalDatabase()
      .then((db) => {
        console.log(db)
        db.transaction((tx) => {
        // WRAP BELOW INTO PROMISE
          tx.executeSql(`
          INSERT INTO Sleeps 
            ( t0, tn, t0String, tnString, hours, minutes, week ) 
          VALUES 
            ( ?, ?, ?, ?, ?, ?, ? ) 
          ;`, 
          [newt0, newtn, newt0String, newtnString, newHours, newMin, week],
          (t, r) => {
            console.log("4r")
            console.log(r)
            // setTimeout(db.closeAsync(), 2000)
          },
          (t, e) => {
            console.log("4e")
            console.log(e)
            // setTimeout(db.closeAsync(), 2000)
          })
        // PUT CLOSEASYNC HERE
        })

      })
      .catch((err) => {
        console.log(err)
      })


  }

  const addSleepEntry = ( startTime, endTime ) => {
    // addByStartDate( startTime, endTime )
    // addByEndDate( startTime, endTime )
    // addByWeek( startTime, endTime )
    // clearAllDebug()

    
    insertIntoSleeps( startTime, endTime )
    // updateWeeks( startTime, endTime )
  }

  const calculateDate = ( time ) => {
    const dateInt = time.getDate()
    var dateString = dateInt.toString()
    if (dateInt < 10) {
      dateString = "0" + dateString
    }
    const monthInt = time.getMonth() + 1
    var monthString = monthInt.toString()
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
    if (index == 0) return "MON"
    if (index == 1) return "TUE"
    if (index == 2) return "WED"
    if (index == 3) return "THU"
    if (index == 4) return "FRI"
    if (index == 5) return "SAT"
    if (index == 6) return "SUN"
  } 

  const calculateMin = ( time ) => {
    const minInt = time.getMinutes()
    var minString = minInt.toString()
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

  const clearAllDebug = async() => {
    try {
      await AsyncStorage.clear()
      console.log("cleared")
    } catch(e) {
      console.log(e)
    }
  }



  const handleStartSubmit = () => {
    console.log("t(0) submit pressed")
    var startDate = startRef.current.calculateDate()
    setT0(startDate)
    if (startDate != null) {
      navigation.navigate("Input", {screen: "End"})
      const min= startDate.getMinutes()
      const hour = startDate.getHours()
      const AMPMString = (hour >= 12) ? "PM" : "AM"
      const date = startDate.getDate()
      const month = startDate.getMonth() + 1
  
      var minString
      if (min < 10) {
        minString  = "0" + min.toString() 
      } else {
        minString = min.toString()
      }
  
      var hourString
      if (hour == 0) {
        hourString = "12"
      } else if (hour >= 13) {
        hourString = (hour - 12).toString()
      } else {
        hourString = hour.toString()
      }
      var dateString = (date < 10) ? ("0" + date.toString()) : date.toString()
      var monthString = (month < 10) ? ("0" + month.toString()) : month.toString()
  
      setT0String("T(0) : "+hourString+":"+minString+AMPMString+" ["+dateString+"/"+monthString+"]" )
    }
  }

  const handleEndSubmit = () => {
    console.log("t(n) submit pressed")
    var endDate = endRef.current.calculateDate()
    // console.log("endDate:",endDate)

    // Check end date > start date 
    if (endDate.getTime() <= t0.getTime()) {
      alert("T(N) must be after T(0)")
      return null
    }

    if (endDate.getTime() - t0.getTime() > 43200000)  {
      alert("Sleep interval must be less than 12hr")
      return null
    } else {
      // console.log(endDate.getTime() - t0.getTime())
    }

    setTn(endDate)
    if (endDate != null) {
      navigation.navigate("Calendar")
    }
    // console.log("t0:", t0,"tN:", endDate)
    addSleepEntry(t0, endDate)
    // alert("Sleep Saved")
    // Reset state of components IS TOO HARD

    // set the var here, pass it to child, run isfocused in input end as perr plan
    setFlag(1)
  }

  const flagFunc = () => {
    navigation.navigate("Input", {screen: "Start"}) //call this in parent
    setFlag(0)
    startRef.current.reset()
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
          t0={t0String} />}
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