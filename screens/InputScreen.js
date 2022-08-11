import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import InputStart from "./InputStart";
import InputEnd from "./InputEnd";

const Stack = createNativeStackNavigator();

const InputScreen = ({navigation}) => {

  const [t0, setT0] = useState(0)
  const [tn, setTn] = useState(0)


  const startRef = useRef(null)
  const endRef = useRef(null)

  const addByStartDate = async ( startTime, endTime ) => {
    var ogJsonValue = null
    const dateObj = new Date(startTime)
    const stringDate = dateObj.getDate().toString()
    const stringMonth = (dateObj.getMonth()+1).toString()
    const stringYear = dateObj.getFullYear().toString()
    const stringStartDate = stringDate + "/" + stringMonth + "/" + stringYear
    
    const timeDiffHours = (endTime.getTime() - startTime.getTime()) / 3600000
    const timeDiffMin = (timeDiffHours - Math.floor(timeDiffHours)) * 60

    try {
      ogJsonValue = await AsyncStorage.getItem('byStartDate')
      if (ogJsonValue == null) {
        // set new storage item
        const newJsonValue = [{ 
          date : stringStartDate, 
          t0 : startTime, 
          tn : endTime, 
          durationHours : Math.floor(timeDiffHours),
          durationMin : timeDiffMin
        }]
        await AsyncStorage.setItem('byStartDate', JSON.stringify(newJsonValue))

      } else if (ogJsonValue != null) {
        const ogArray = JSON.parse(ogJsonValue)
        // append to existing storage item
        const modJsonValue = [
          ...ogArray, 
          { 
            date : stringStartDate, 
            t0 : startTime, 
            tn : endTime, 
            durationHours : Math.floor(timeDiffHours),
            durationMin : timeDiffMin
          }]

        await AsyncStorage.setItem('byStartDate', JSON.stringify(modJsonValue))
      }
      const res = await AsyncStorage.getItem('byStartDate')
      console.log(res)
    } catch (e) {
      alert("Error - couldn't save data")
      console.log(e)
    }
  }

  const addByEndDate = async ( startTime, endTime ) => {
    var ogJsonValue = null
    const dateObj = new Date(endTime)
    const stringDate = dateObj.getDate().toString()
    const stringMonth = (dateObj.getMonth()+1).toString()
    const stringYear = dateObj.getFullYear().toString()
    const stringEndDate = stringDate + "/" + stringMonth + "/" + stringYear

    try {
      ogJsonValue = await AsyncStorage.getItem('byEndDate')
      if (ogJsonValue == null) {
        // set new storage item
        const newJsonValue = [{ date : stringEndDate, t0 : startTime, tn : endTime }]
        await AsyncStorage.setItem('byEndDate', JSON.stringify(newJsonValue))

      } else if (ogJsonValue != null) {
        const ogArray = JSON.parse(ogJsonValue)
        // append to existing storage item
        const modJsonValue = [
          ...ogArray, 
          { date : stringEndDate, t0 : startTime, tn : endTime }]

        await AsyncStorage.setItem('byEndDate', JSON.stringify(modJsonValue))
      }
      const res = await AsyncStorage.getItem('byEndDate')
      console.log(res)
    } catch (e) {
      alert("Error - couldn't save data")
      console.log(e)
    }
  }

  const addByWeek = async ( startTime, endTime ) => {
    const startOfUniverse = 1659276000000 // 1st Aug 2022 in milliseconds since epoch
    const weekInMilli = 604800000
    const startInmilli = startTime.getTime()
    const weeks = Math.floor((startInmilli - startOfUniverse) / weekInMilli)

    var ogJsonValue = null
    try {
      ogJsonValue = await AsyncStorage.getItem('byWeek')
      if (ogJsonValue == null) {
        // set new storage item
        const newJsonValue = [{ week : weeks , t0 : startTime, tn : endTime }]
        await AsyncStorage.setItem('byWeek', JSON.stringify(newJsonValue))

      } else if (ogJsonValue != null) {
        const ogArray = JSON.parse(ogJsonValue)
        // append to existing storage item
        const modJsonValue = [
          ...ogArray, 
          { week : weeks, t0 : startTime, tn : endTime }]

        await AsyncStorage.setItem('byWeek', JSON.stringify(modJsonValue))
      }
      const res = await AsyncStorage.getItem('byWeek')
      console.log(res)
    } catch (e) {
      alert("Error - couldn't save data")
      console.log(e)
    }
  }

  const clearAllDebug = async() => {
    try {
      await AsyncStorage.clear()
      console.log("cleared")
    } catch(e) {
      console.log(e)
    }
  }

  const addSleepEntry = ( startTime, endTime ) => {
    // addByStartDate( startTime, endTime )
    // addByEndDate( startTime, endTime )
    // addByWeek( startTime, endTime )
    clearAllDebug()
  }

  const handleStartSubmit = () => {
    console.log("t(0) submit pressed")
    var startDate = startRef.current.calculateDate()
    setT0(startDate)
    if (startDate != null) {
      navigation.navigate("Input", {screen: "End"})
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
    alert("Sleep Saved")
    // Reset state of components IS TOO HARD
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
            fontSize: 18,
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
        {() => <InputEnd ref={endRef} navigation={navigation} />}
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