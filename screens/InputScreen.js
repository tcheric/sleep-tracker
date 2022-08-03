import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native"

import InputStart from "./InputStart";
import InputEnd from "./InputEnd";

const Stack = createNativeStackNavigator();


const InputScreen = ({ navigation }) => {
  return (
    <NavigationContainer independent={true} >
      <Stack.Navigator>
        <Stack.Screen
          name="Start"
          component={InputStart}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
});

export default InputScreen