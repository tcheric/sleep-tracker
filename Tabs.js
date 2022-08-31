import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from './screens/CalendarScreen'
import InputScreen from './screens/InputScreen'
import GraphScreen from './screens/GraphScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, StyleSheet } from "react-native";
import { useState, useEffect, useRef } from "react"

const Tab = createBottomTabNavigator()

const Tabs = () => {
  const [refresh, setRefresh] = useState(0)
  
  const calendarRef = useRef(null)

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
      <Tab.Screen name="Calendar"
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
      >
        {(props) => <CalendarScreen {...props} ref={calendarRef} />}
        {/* {() => <CalendarScreen ref={calendarRef} navigation={navigation} />} */}
      </Tab.Screen>

      <Tab.Screen name="Input"
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
        >
        {(props) => <InputScreen {...props} calRef={calendarRef} setRefresh={setRefresh} />}
        {/* {() => <InputScreen calRef={calendarRef} navigation={navigation} />} */}
      </Tab.Screen>

      <Tab.Screen name="Graph"
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
        >
        {(props) => <GraphScreen {...props} refresh={refresh} />}
      </Tab.Screen>
      
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
    borderColor: "rgba(0, 0, 0, 0)", 
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