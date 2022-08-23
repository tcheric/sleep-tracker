import { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

// const [t0, setT0] = useState(0)

const SleepItem = ({ t0String, tnString, hours, minutes }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>T(0): {t0String}</Text>
      <Text style={styles.itemText}>T(N): {tnString}</Text>
      <Text style={styles.itemText}>{hours} HR {minutes} MIN</Text>
      <View style={styles.bar}></View>
      <TouchableOpacity style={styles.delete} onPress={() => {alert("PRESSD")}}>
        <Ionicons name="close-outline" size={42} color="#838383"/>
      </TouchableOpacity >
    </View>
  )
}

const styles = StyleSheet.create({
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

export default SleepItem