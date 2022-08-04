import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';




const InputStart = () => {
  const [dayOffset, setDayOffset] = useState(0)
  const [touchPos, setTouchPos] = useState(0)

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

      <View style={styles.outerContainer} onTouchStart={(e) => {setTouchPos(e.nativeEvent.pageX)}} > 
          <TouchableOpacity style={styles.twelve}>
            <View style={styles.hour}></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.one}>
            <View style={styles.hour}></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.two}>
            <View style={styles.hour}></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.three}>
            <View style={styles.hour}></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.four}>
            <View style={styles.hour}></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.five}>
            <View style={styles.hour}></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.six}>
            <View style={styles.hour}></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.seven}>
            <View style={styles.hour}></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.eight}>
            <View style={styles.hour}></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nine}>
            <View style={styles.hour}></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ten}>
            <View style={styles.hour}></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.eleven}>
            <View style={styles.hour}></View>
          </TouchableOpacity>

        <Text style={styles.text}>AM / PM</Text>
        <Text style={styles.text}>{touchPos}</Text>
      </View>


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
    fontSize: 20,
    fontWeight: "400",
    // letterSpacing: 1,
  },
  dateContainer: {
    position: "absolute",
    top: 80,
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
  },
  outerContainer: {
    top: -40,
    // backgroundColor:"grey",
    width: "50%",
    aspectRatio: 1 / 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  twelve: {
    height: 1,
    width: 1,
    backgroundColor: "red",
    position: "absolute",
    padding: 5,
    borderRadius: 10,
    marginLeft: 5,
    marginTop: 5,
  },
 

  hour: {
    // height: 1,
    // width: 1,
    backgroundColor: "red",
    position: "absolute",
    padding: 7,
    borderRadius: 14,
    marginLeft: 11,
    marginTop: 11,
  },
  one: {
    position: "absolute",
    top: "6.7%",
    left: "75%",
    marginLeft: -18,
    marginTop: -18,
    // backgroundColor: "white",
    padding: 18,
    borderRadius: 18,
  },
  two: {
    position: "absolute",
    top: "25%",
    left: "93.3%",
    marginLeft: -18,
    marginTop: -18,
    // backgroundColor: "white",
    padding: 18,
    borderRadius: 18,
  },
  three: {
    position: "absolute",
    top: "50%",
    left: "100%",
    marginLeft: -18,
    marginTop: -18,
    // backgroundColor: "white",
    padding: 18,
    borderRadius: 18,
  },
  four: {
    position: "absolute",
    top: "75%",
    left: "93.3%",
    marginLeft: -18,
    marginTop: -18,
    // backgroundColor: "white",
    padding: 18,
    borderRadius: 18,
  },
  five: {
    position: "absolute",
    top: "93.3%",
    left: "75%",
    marginLeft: -18,
    marginTop: -18,
    // backgroundColor: "white",
    padding: 18,
    borderRadius: 18,
  },
  six: {
    position: "absolute",
    top: "100%",
    left: "50%",
    marginLeft: -18,
    marginTop: -18,
    // backgroundColor: "white",
    padding: 18,
    borderRadius: 18,
  },
  seven: {
    position: "absolute",
    top: "93.3%",
    left: "25%",
    marginLeft: -18,
    marginTop: -18,
    // backgroundColor: "white",
    padding: 18,
    borderRadius: 18,
  },
  eight: {
    position: "absolute",
    top: "75%",
    left: "6.7%",
    marginLeft: -18,
    marginTop: -18,
    // backgroundColor: "white",
    padding: 18,
    borderRadius: 18,
  },
  nine: {
    position: "absolute",
    top: "50%",
    left: "0%",
    marginLeft: -18,
    marginTop: -18,
    // backgroundColor: "white",
    padding: 18,
    borderRadius: 18,
  },
  ten: {
    position: "absolute",
    top: "25%",
    left: "6.7%",
    marginLeft: -18,
    marginTop: -18,
    // backgroundColor: "white",
    padding: 18,
    borderRadius: 18,
  },
  eleven: {
    position: "absolute",
    top: "6.7%",
    left: "25%",
    marginLeft: -18,
    marginTop: -18,
    // backgroundColor: "white",
    padding: 18,
    borderRadius: 18,
  },
  twelve: {
    position: "absolute",
    top: 0,
    left: "50%",
    marginLeft: -18,
    marginTop: -18,
    // backgroundColor: "white",
    padding: 18,
    borderRadius: 18,
  },

})

export default InputStart