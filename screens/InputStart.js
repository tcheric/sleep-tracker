import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';




const InputStart = () => {
  const [dayOffset, setDayOffset] = useState(0)

  const getSelectedDate=()=>{
    var date = new Date(Date.now() - 86400000 * dayOffset).getDate()
    var month = new Date(Date.now() - 86400000 * dayOffset).getMonth() + 1;
    var dateString = (date < 10) ? ("0" + date.toString()) : date.toString()
    var monthString = (month < 10) ? ("0" + month.toString()) : month.toString()
    
    return dateString + '/' + monthString;//format: dd-mm-yyyy;
  }

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <TouchableOpacity 
          style={styles.icons} 
          onPress={() => {
            if (dayOffset <= 6) {
              setDayOffset(dayOffset + 1)
            }
          }}
        >
          <Ionicons name="chevron-back-outline" 
            size={20} 
            color={(dayOffset > 6) ? "rgb(50,50,50)" : "red"}
          />
        </TouchableOpacity >
        <Text style={styles.date}>{getSelectedDate()}</Text>
        <TouchableOpacity 
          style={styles.icons} 
          onPress={() => {
            if (dayOffset !== 0) {
              setDayOffset(dayOffset - 1)
            }
          }}
        >
          <Ionicons name="chevron-forward-outline" 
            size={20} 
            color={(dayOffset === 0) ? "rgb(150,150,150)" : "red"}
          />
        </TouchableOpacity >
      </View>
      <Text style={styles.text}>Input Start</Text>
    </View>
  )
}

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
    top: 20,
    borderColor: "black",
    borderRadius: 3,
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
  }
})

export default InputStart