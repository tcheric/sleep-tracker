import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from '../screens/CalendarScreen'
import InputScreen from '../screens/InputScreen'
import GraphScreen from '../screens/GraphScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator()

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          position: 'absolute',
          bottom: 10,
          left: 50,
          right: 50,
          backgroundColor: 'rgb(30,30,30)',
          height: 60,
          borderTopWidth: 0,
          borderRadius: 0,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Input') {
            iconName = focused
              ? 'add'
              : 'add-outline';
          } else if (route.name === 'Calendar') {
            iconName = 'calendar-outline';
          } else if (route.name === 'Graph') {
            iconName = 'stats-chart-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'rgb(200,200,200)', 
      })}
    >
      <Tab.Screen name="Calendar" component={CalendarScreen} 
        options={{
          title: "CALENDAR",
          // headerStyle: {
          //   backgroundColor: 'rgb(20,20,20)',
          // },
          headerTitleStyle: {
            fontSize: 16,
            display: "flex",
            justifyContent: "space-between"
          },
        }}
      />
      <Tab.Screen name="Input" component={InputScreen}/>
      <Tab.Screen name="Graph" component={GraphScreen} />
    </Tab.Navigator>
  )
}

export default Tabs