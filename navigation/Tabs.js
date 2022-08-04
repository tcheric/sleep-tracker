import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from '../screens/CalendarScreen'
import InputScreen from '../screens/InputScreen'
import GraphScreen from '../screens/GraphScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, StyleSheet } from "react-native";

const Tab = createBottomTabNavigator()

const Tabs = () => {
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
        initialRouteName: "Graph"
      })}
      initialRouteName="Input"
    >
      <Tab.Screen name="Calendar" component={CalendarScreen} 
        options={{
          title: "CALENDAR",
          headerStyle: {
            backgroundColor: 'rgb(25,25,25)',
            shadowColor: "rgba(0,0,0,0)",
          },
          headerTitleStyle: {
            fontSize: 17,
            color: 'white',
          },
          tabBarIcon: ({color}) => (
            <Ionicons name='calendar-outline' size={32} color={color} />
          ),
        }}
      />
      <Tab.Screen name="Input" component={InputScreen}
        options={{
          headerShown: false,
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
          title: "GRAPH",
          headerStyle: {
            backgroundColor: 'rgb(25,25,25)',
            shadowColor: "rgba(0,0,0,0)",
          },
          headerTitleStyle: {
            fontSize: 17,
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
    // borderColor: "white", 
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