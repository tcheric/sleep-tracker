import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import openLocalDatabase from "../utils/openLocalDatabase";

const CalendarScreen = ({navigation}) => {
  const [wk, setWk] = useState("")
  const [items, setItems] = useState([])

  useEffect(() => {
    // Calculate curent week
    const startOfUniverse = 1659276000000 // 1st Aug 2022 in milliseconds since epoch
    const weekInMilli = 604800000
    const nowMilli = new Date().getTime()
    const week = Math.floor((nowMilli - startOfUniverse) / weekInMilli)

    openLocalDatabase()
      .then((db) => {
        console.log(db)
        db.transaction((tx) => {
          tx.executeSql(`SELECT * FROM Sleeps WHERE week=?`, [week], (_, { rows }) => {
            // console.log(JSON.stringify(rows))
            console.log(rows)
            // Get all sleeps inn the current week
          })
          tx.executeSql(`SELECT * FROM Weeks WHERE week=?`, [week], (_, { rows }) => {
            // console.log(JSON.stringify(rows))
            // console.log(rows[0].stringRep)
            console.log(rows._array[0].stringRep)
            setWk(rows._array[0].stringRep)
            // get current week's week and stringRep
          })
        })
      })
      .catch((err) => {
        console.log(err)
      })
    
  }, [])

  return (
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
{/*PLACEHOLDDER */}
      {/* <Text style={styles.text}>Calendar Screen</Text> */}
{/*TEST ITEMS */}
        <View style={styles.item}></View>
        <View style={styles.item}></View>
        <View style={styles.item}></View>
        <View style={styles.item}></View>
        <View style={styles.item}></View>
        <View style={styles.item}></View>
        <View style={styles.item}></View>
        <View style={styles.item}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  text: {
    color: 'red',
  },
  dateContainer: {
    // position: "absolute",
    // top: "3%",
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
    height: 90,
    backgroundColor: "rgb(36, 31, 33)",
    color: "green",
    marginVertical: 10,
  }
});

export default CalendarScreen