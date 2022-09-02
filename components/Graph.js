import { useEffect, useState } from 'react'
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryAnimation  } from "victory-native";
import { custom } from "../utils/customTheme";

const Graph = ({ data }) => {
  const hourColor = "rgb(55,55,60)"

  const dataEx = [
    { day: "Mo", hours: 8 },
    { day: "Tu", hours: 9 },
    { day: "We", hours: 10 },
    { day: "Th", hours: 6 },
    { day: "Fr", hours: 4 },
    { day: "Sa", hours: 11 },
    { day: "Su", hours: 8.6 },
  ]
  
  return (
    <View style={styles.container}>
      <VictoryChart style={styles.graph} width={400} height={400} theme={custom} domainPadding={25}>
        
        <VictoryBar 
          animate={{ onLoad: { delay: 0, duration: 1 }, duration: 2280 }} 
          data={data} 
          labels={({ datum }) => (Math.round((datum._y)*10)/10).toString()}
          x="day" 
          y="hours" 
        />
        <VictoryAxis style={{ tickLabels: { padding: 10 } }}/>
      </VictoryChart>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
    backgroundColor: "black"
  },
  graph: {
    position: "absolute",
    left: 100,
  },
});

export default Graph