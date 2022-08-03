import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native"
import Ionicons from 'react-native-vector-icons/Ionicons';

import InputStart from "./InputStart";
import InputEnd from "./InputEnd";

const Stack = createNativeStackNavigator();

const InputScreen = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center', animation: 'none'}}>
      <Stack.Screen
        name="Start"
        component={InputStart}
        options={{
          title: "START",
          headerStyle: {
            backgroundColor: 'rgb(20,20,20)',
            height: 100,
          },
          headerTitleStyle: {
            fontSize: 16,
            color: 'white',
          },
          headerLeft: () => {return null},
          headerRight: () => (
            <TouchableOpacity  onPress={() => {navigation.navigate("Input", {screen: "End"})}} style={styles.icons}>
              <Ionicons name="chevron-forward-outline" 
                size={23} 
                color="white" 
              />
            </TouchableOpacity >
          ),
        }}
      />
      <Stack.Screen
        name="End"
        component={InputEnd}
        options={{
          title: "END",
          headerStyle: {
            backgroundColor: 'rgb(20,20,20)',
            height: 100,
          },
          headerTitleStyle: {
            fontSize: 16,
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