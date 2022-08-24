import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useEffect, useState, useImperativeHandle, forwardRef, useRef } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

const GraphScreen = () => {
  const [wkString, setWkString] = useState("")
  const [wk, setWk] = useState(()=>{
    // Calculate curent week
    const startOfUniverse = 1659276000000 // 1st Aug 2022 in milliseconds since epoch
    const weekInMilli = 604800000
    const nowMilli = new Date().getTime()
    const week = Math.floor((nowMilli - startOfUniverse) / weekInMilli)
    return week
  })



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
    <View style={styles.dataContainer}></View>

    </View>
  );
};

const styles = StyleSheet.create({
  containsAll: {
    position: "relative",
    flex: 1,
  },

  graphContainer: {
    backgroundColor: "purple",
    height: 380,
    width: "100%",
    position:"absolute",
    bottom: 240,
  },

  dataContainer: {
    backgroundColor: "blue",
    height: 120,
    width: "100%",
    position:"absolute",
    bottom: 120,
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