import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const CalendarScreen = ({navigation}) => {
  const getWeek = async () => {
    // • How to add each week even when sleep isn't added? (andd get stringReps?) hardcode?

  }


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