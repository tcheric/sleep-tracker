import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from './screens/CalendarScreen'
import InputScreen from './screens/InputScreen'
import GraphScreen from './screens/GraphScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, StyleSheet } from "react-native";
import { useEffect } from "react"
import * as SQLite from "expo-sqlite";

const Tab = createBottomTabNavigator()

const db = SQLite.openDatabase("db.db");

const Tabs = () => {

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`
      CREATE TABLE IF NOT EXISTS Weeks (
        week INTEGER PRIMARY KEY, 
        stringRep TEXT, 
        total INTEGER, 
        average INTEGER, 
        startDate TEXT, 
        endDate TEXT
        );`, 
      [],
      (t, r) => {
        console.log("1st")
        console.log(r)
      },
      (t, e) => {
        console.log("2nd e")
        console.log(e)
      })
    });
    
    db.transaction((tx) => {
      tx.executeSql(`
      CREATE TABLE IF NOT EXISTS Sleeps (
        t0 INTEGER PRIMARY KEY, 
        tn INTEGER, 
        t0String TEXT, 
        tnString TEXT, 
        hours INTEGER, 
        minutes INTEGER, 
        week INTEGER REFERENCES Weeks(week)
        );`, 
      [],
      (t, r) => {
        console.log("2nd")
        console.log(r)
      },
      (t, e) => {
        console.log("2nd e")
        console.log(e)
      })
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          position: 'absolute',
          bottom: 24,
          left: 55,
          right: 55,
          backgroundColor: 'rgb(30,30,30)',
          height: 55,
          borderTopWidth: 0,
          borderRadius: 8,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'rgb(200,200,200)', 
        headerTitleAlign: 'center',
      })}
      initialRouteName="Input"
      >
      <Tab.Screen name="Calendar" component={CalendarScreen} 
        options={{
          lazy: true,
          // title: "CALENDAR",
          title: "LOG",
          headerStyle: {
            backgroundColor: 'rgb(25,25,25)',
            shadowColor: "rgba(0,0,0,0)",
          },
          headerTitleStyle: {
            fontSize: 19,
            color: 'white',
          },
          tabBarIcon: ({color}) => (
            <Ionicons name='calendar-outline' size={32} color={color} />
          ),
        }}
      />
      <Tab.Screen name="Input" component={InputScreen}
        options={{
          lazy: true,
          headerShown: false,
          // unmountOnBlur: true,
          tabBarIcon: ({color, focused}) => (
            <View style={styles.plusIconWrapper}>
              <View style={{
                borderColor: focused ? "red" : "rgb(180,180,180)", 
                borderWidth: 2,
                borderRadius: 28,
                width: 56,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgb(16,16,16)", 
              }} >
                <Ionicons name='add' size={50} color={color} 
                  style={styles.plusIcon}
                />
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen name="Graph" component={GraphScreen}
        options={{
          lazy: true,
          title: "GRAPH",
          headerStyle: {
            backgroundColor: 'rgb(25,25,25)',
            shadowColor: "rgba(0,0,0,0)",
          },
          headerTitleStyle: {
            fontSize: 19,
            color: 'white',
          },
          tabBarIcon: ({color}) => (
            <Ionicons name='stats-chart-outline' size={32} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  plusIcon: {
    marginHorizontal: -3,
    marginVertical: -1,
    paddingLeft: 2,
  },
  plusIconWrapper: {
    borderColor: "black", 
    borderWidth: 6,
    borderRadius: 33,
    position: "absolute",
    bottom: 22,
    width: 66,
    height: 66,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Tabs