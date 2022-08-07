import React, { useState, useRef } from 'react';

import { StyleSheet, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import InputStart from "./InputStart";
import InputEnd from "./InputEnd";

const Stack = createNativeStackNavigator();

const InputScreen = ({navigation}) => {

  const [t0, setT0] = useState(0)
  const [tn, setTn] = useState(0)

  const childRef = useRef()

  const handleStartSubmit = () => {
    console.log("submit pressed")
    // childRef.current.getAlert()
    var startDate = childRef.current.calculateDate()
    console.log(startDate)
    setT0(startDate)
    if (startDate != null) {
      navigation.navigate("Input", {screen: "End"})
    }
  }

  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center', animation: 'none'}}>
      <Stack.Screen
        name="Start"
        // component={InputStart}
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
        {() => <InputStart ref={childRef} />}
      </Stack.Screen>
      <Stack.Screen
        name="End"
        component={InputEnd}
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
            <TouchableOpacity  onPress={() => alert("Save")} style={styles.icons}>
              <Ionicons name="checkmark-outline" 
                size={23} 
                color="white" 
              />
            </TouchableOpacity >
          ),
        }}
      />
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