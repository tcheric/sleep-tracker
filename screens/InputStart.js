import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const InputStart = () => {
  return (
    <View style={styles.container}>
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
})

export default InputStart