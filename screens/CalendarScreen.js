import { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SQLite from 'expo-sqlite';
import openLocalDatabase from "../utils/openLocalDatabase";

// const db = openLocalDatabase()
const db2 = SQLite.openDatabase("db.db");
// var db

// openLocalDatabase()
//   .then((value) => {
//     db = value
//     // console.log(db)
//   })
//   .catch((err) => {
//     console.log(err)
//   })


const CalendarScreen = ({navigation}) => {

  useEffect(() => {
    setTimeout(
      openLocalDatabase()
        .then((db) => {
          console.log(db)
          db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM Sleeps`, [], (_, { rows }) => {
              console.log(JSON.stringify(rows))
              console.log(rows)
            })
            tx.executeSql(`SELECT * FROM Weeks`, [], (_, { rows }) => {
              console.log(JSON.stringify(rows))
              console.log(rows)
            })
          })
        })
        .catch((err) => {
          console.log(err)
        })
    , 5000)


  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Calendar Screen</Text>
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
        <Text style={styles.date}>100</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'red',
  },
  dateContainer: {
    position: "absolute",
    top: "12%",
    borderColor: "black",
    borderRadius: 50,
    backgroundColor: "rgb(30,30,30)",
    height: 34,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  date: {
    fontSize: 16,
    marginHorizontal:10,
    color: 'rgb(230,230,230)',
  },
  icons: {
    width: 36,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CalendarScreen