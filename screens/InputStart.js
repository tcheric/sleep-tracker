import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, PanResponder } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';




const InputStart = () => {
  const [dayOffset, setDayOffset] = useState(0)
  const [circleVisible, setCircleVisible] = useState(0)
  // const [touchPos, setTouchPos] = useState(0)

  const getSelectedDate=()=>{
    var date = new Date(Date.now() - 86400000 * dayOffset).getDate()
    var month = new Date(Date.now() - 86400000 * dayOffset).getMonth() + 1;
    var dateString = (date < 10) ? ("0" + date.toString()) : date.toString()
    var monthString = (month < 10) ? ("0" + month.toString()) : month.toString()
    return dateString + '/' + monthString;
  }

  //  Pan responder for touch tracking
  var prObj = { "pans": {}, "panResponders" : {} }
  for (var i = 0; i < 12; i++) { 
    prObj["pans"][i] = useRef(new Animated.ValueXY()).current;
  }


  var pr0 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("ON MOVE")
        prObj["pans"][0].setOffset({
          x: prObj["pans"][0].x._value,
          y: prObj["pans"][0].y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: prObj["pans"][0].x, dy: prObj["pans"][0].y }
        ],
        {useNativeDriver: false}
      ),
      onPanResponderRelease: (e, gesture) => {
        prObj["pans"][0].flattenOffset();
        if (gesture.moveY > 627 && gesture.moveY < 680) {
          console.log("DROPPED")
        } else  {
          prObj["pans"][0].x.setValue(0)
          prObj["pans"][0].y.setValue(0)
        }
      }
    })
  ).current
  
  var pr1 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("ON MOVE")
        prObj["pans"][1].setOffset({
          x: prObj["pans"][1].x._value,
          y: prObj["pans"][1].y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: prObj["pans"][1].x, dy: prObj["pans"][1].y }
        ],
        {useNativeDriver: false}
      ),
      onPanResponderRelease: (e, gesture) => {
        prObj["pans"][1].flattenOffset();
        if (gesture.moveY > 627 && gesture.moveY < 680) {
          console.log("DROPPED")
        } else  {
          prObj["pans"][1].x.setValue(0)
          prObj["pans"][1].y.setValue(0)
        }
      }
    })
  ).current

  var pr2 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("ON MOVE")
        prObj["pans"][2].setOffset({
          x: prObj["pans"][2].x._value,
          y: prObj["pans"][2].y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: prObj["pans"][2].x, dy: prObj["pans"][2].y }
        ],
        {useNativeDriver: false}
      ),
      onPanResponderRelease: (e, gesture) => {
        prObj["pans"][2].flattenOffset();
        if (gesture.moveY > 627 && gesture.moveY < 680) {
          console.log("DROPPED")
        } else  {
          prObj["pans"][2].x.setValue(0)
          prObj["pans"][2].y.setValue(0)
        }
      }
    })
  ).current

  var pr3 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("ON MOVE")
        prObj["pans"][3].setOffset({
          x: prObj["pans"][3].x._value,
          y: prObj["pans"][3].y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: prObj["pans"][3].x, dy: prObj["pans"][3].y }
        ],
        {useNativeDriver: false}
      ),
      onPanResponderRelease: (e, gesture) => {
        prObj["pans"][3].flattenOffset();
        if (gesture.moveY > 627 && gesture.moveY < 680) {
          console.log("DROPPED")
        } else  {
          prObj["pans"][3].x.setValue(0)
          prObj["pans"][3].y.setValue(0)
        }
      }
    })
  ).current

  var pr4 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("ON MOVE")
        prObj["pans"][4].setOffset({
          x: prObj["pans"][4].x._value,
          y: prObj["pans"][4].y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: prObj["pans"][4].x, dy: prObj["pans"][4].y }
        ],
        {useNativeDriver: false}
      ),
      onPanResponderRelease: (e, gesture) => {
        prObj["pans"][4].flattenOffset();
        if (gesture.moveY > 627 && gesture.moveY < 680) {
          console.log("DROPPED")
        } else  {
          prObj["pans"][4].x.setValue(0)
          prObj["pans"][4].y.setValue(0)
        }
      }
    })
  ).current

  var pr5 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("ON MOVE")
        prObj["pans"][5].setOffset({
          x: prObj["pans"][5].x._value,
          y: prObj["pans"][5].y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: prObj["pans"][5].x, dy: prObj["pans"][5].y }
        ],
        {useNativeDriver: false}
      ),
      onPanResponderRelease: (e, gesture) => {
        prObj["pans"][5].flattenOffset();
        if (gesture.moveY > 627 && gesture.moveY < 680) {
          console.log("DROPPED")
        } else  {
          prObj["pans"][5].x.setValue(0)
          prObj["pans"][5].y.setValue(0)
        }
      }
    })
  ).current

  var pr6 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("ON MOVE")
        prObj["pans"][6].setOffset({
          x: prObj["pans"][6].x._value,
          y: prObj["pans"][6].y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: prObj["pans"][6].x, dy: prObj["pans"][6].y }
        ],
        {useNativeDriver: false}
      ),
      onPanResponderRelease: (e, gesture) => {
        prObj["pans"][6].flattenOffset();
        if (gesture.moveY > 627 && gesture.moveY < 680) {
          console.log("DROPPED")
        } else  {
          prObj["pans"][6].x.setValue(0)
          prObj["pans"][6].y.setValue(0)
        }
      }
    })
  ).current

  var pr7 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("ON MOVE")
        prObj["pans"][7].setOffset({
          x: prObj["pans"][7].x._value,
          y: prObj["pans"][7].y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: prObj["pans"][7].x, dy: prObj["pans"][7].y }
        ],
        {useNativeDriver: false}
      ),
      onPanResponderRelease: (e, gesture) => {
        prObj["pans"][7].flattenOffset();
        if (gesture.moveY > 627 && gesture.moveY < 680) {
          console.log("DROPPED")
        } else  {
          prObj["pans"][7].x.setValue(0)
          prObj["pans"][7].y.setValue(0)
        }
      }
    })
  ).current

  var pr8 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("ON MOVE")
        prObj["pans"][8].setOffset({
          x: prObj["pans"][8].x._value,
          y: prObj["pans"][8].y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: prObj["pans"][8].x, dy: prObj["pans"][8].y }
        ],
        {useNativeDriver: false}
      ),
      onPanResponderRelease: (e, gesture) => {
        prObj["pans"][8].flattenOffset();
        if (gesture.moveY > 627 && gesture.moveY < 680) {
          console.log("DROPPED")
        } else  {
          prObj["pans"][8].x.setValue(0)
          prObj["pans"][8].y.setValue(0)
        }
      }
    })
  ).current

  var pr9 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("10 moved")
        prObj["pans"][9].setOffset({
          x: prObj["pans"][9].x._value,
          y: prObj["pans"][9].y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: prObj["pans"][9].x, dy: prObj["pans"][9].y }
        ],
        {useNativeDriver: false}
      ),
      onPanResponderRelease: (e, gesture) => {
        prObj["pans"][9].flattenOffset();
        if (gesture.moveY > 627 && gesture.moveY < 680) {
          console.log("DROPPED")
        } else  {
          prObj["pans"][9].x.setValue(0)
          prObj["pans"][9].y.setValue(0)
        }
      }
    })
  ).current

  var pr10 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("11 moved")
        restart()
        prObj["pans"][10].setOffset({
          x: prObj["pans"][10].x._value,
          y: prObj["pans"][10].y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: prObj["pans"][10].x, dy: prObj["pans"][10].y }
        ],
        {useNativeDriver: false}
      ),
      onPanResponderRelease: (e, gesture) => {
        prObj["pans"][10].flattenOffset();
        if (gesture.moveY > 627 && gesture.moveY < 680) {
          console.log("DROPPED")
        } else  {
          prObj["pans"][10].x.setValue(0)
          prObj["pans"][10].y.setValue(0)
        }
      }
    })
  ).current

  var pr11 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("ON MOVE")
        prObj["pans"][11].setOffset({
          x: prObj["pans"][11].x._value,
          y: prObj["pans"][11].y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: prObj["pans"][11].x, dy: prObj["pans"][11].y }
        ],
        {useNativeDriver: false}
      ),
      onPanResponderRelease: (e, gesture) => {
        // prObj["pans"][11].flattenOffset();
        prObj["pans"][11].flattenOffset();
        if (gesture.moveY > 627 && gesture.moveY < 680) {
          console.log("DROPPED")
        } else  {
          prObj["pans"][11].x.setValue(0)
          prObj["pans"][11].y.setValue(0)
        }
      }
    })
  ).current
  
  const overwriteStyle = {
    position: "absolute",
    marginLeft: -18,
    marginTop: -18,
    padding: 18,
    borderRadius: 18,
    // backgroundColor: "blue",
    zIndex: 2,
  }

  return (
    <Animated.View
      style={styles.container}
      >
      
      <View style={styles.dateContainer}>
        <TouchableOpacity 
          style={styles.icons} 
          onPress={() => {
            if (dayOffset <= 6) {
              setDayOffset(dayOffset + 1)
            }
          }}>
          <Ionicons name="chevron-back-outline" 
            size={20} 
            color={(dayOffset > 6) ? "rgb(50,50,50)" : "red"}/>
        </TouchableOpacity >
        <Text style={styles.date}>{getSelectedDate()}</Text>
        <TouchableOpacity 
          style={styles.icons} 
          onPress={() => {
            if (dayOffset !== 0) {
              setDayOffset(dayOffset - 1)
            }
          }}>
          <Ionicons name="chevron-forward-outline" 
            size={20} 
            color={(dayOffset === 0) ? "rgb(150,150,150)" : "red"}/>
        </TouchableOpacity >
      </View>

      <View style={styles.innerClockContainer}> 

        <Animated.View style={[{
            transform: [{ translateX: prObj.pans[11].x }, { translateY: prObj.pans[11].y }],
            top: "0%",
            left: "50%",
          }, overwriteStyle]} {...pr11.panHandlers}>
          <View style={styles.hour}></View>
        </Animated.View>
        <TouchableOpacity style={styles.twelve}>
          <View style={styles.hour}></View>
        </TouchableOpacity>

        <Animated.View style={[{
            transform: [{ translateX: prObj.pans[0].x }, { translateY: prObj.pans[0].y }],
            top: "6.7%",
            left: "75%",
          }, overwriteStyle]} {...pr0.panHandlers}>
          <View style={styles.hour}></View>
        </Animated.View>
        <TouchableOpacity style={styles.one}>
          <View style={styles.hour}></View>
        </TouchableOpacity>

        <Animated.View style={[{
            transform: [{ translateX: prObj.pans[1].x }, { translateY: prObj.pans[1].y }],
            top: "25%",
            left: "93.3%",
          }, overwriteStyle]} {...pr1.panHandlers}>
          <View style={styles.hour}></View>
        </Animated.View>
        <TouchableOpacity style={styles.two}>
          <View style={styles.hour}></View>
        </TouchableOpacity>

        <Animated.View style={[{
            transform: [{ translateX: prObj.pans[2].x }, { translateY: prObj.pans[2].y }],
            top: "50%",
            left: "100%",
          }, overwriteStyle]} {...pr2.panHandlers}>
          <View style={styles.hour}></View>
        </Animated.View>
        <TouchableOpacity style={styles.three}>
          <View style={styles.hour}></View>
        </TouchableOpacity>

        <Animated.View style={[{
            transform: [{ translateX: prObj.pans[3].x }, { translateY: prObj.pans[3].y }],
            top: "75%",
            left: "93.3%",
          }, overwriteStyle]} {...pr3.panHandlers}>
          <View style={styles.hour}></View>
        </Animated.View>
        <TouchableOpacity style={styles.four}>
          <View style={styles.hour}></View>
        </TouchableOpacity>

        <Animated.View style={[{
            transform: [{ translateX: prObj.pans[4].x }, { translateY: prObj.pans[4].y }],
            top: "93.3%",
            left: "75%",
          }, overwriteStyle]} {...pr4.panHandlers}>
          <View style={styles.hour}></View>
        </Animated.View>
        <TouchableOpacity style={styles.five}>
          <View style={styles.hour}></View>
        </TouchableOpacity>

        <Animated.View style={[{
            transform: [{ translateX: prObj.pans[5].x }, { translateY: prObj.pans[5].y }],
            top: "100%",
            left: "50%",
          }, overwriteStyle]} {...pr5.panHandlers}>
          <View style={styles.hour}></View>
        </Animated.View>
        <TouchableOpacity style={styles.six}>
          <View style={styles.hour}></View>
        </TouchableOpacity>

        <Animated.View style={[{
            transform: [{ translateX: prObj.pans[6].x }, { translateY: prObj.pans[6].y }],
            top: "93.3%",
            left: "25%",
          }, overwriteStyle]} {...pr6.panHandlers}>
          <View style={styles.hour}></View>
        </Animated.View>
        <TouchableOpacity style={styles.seven}>
          <View style={styles.hour}></View>
        </TouchableOpacity>

        <Animated.View style={[{
            transform: [{ translateX: prObj.pans[7].x }, { translateY: prObj.pans[7].y }],
            top: "75%",
            left: "6.7%",
          }, overwriteStyle]} {...pr7.panHandlers}>
          <View style={styles.hour}></View>
        </Animated.View>

        <TouchableOpacity style={styles.eight}>
          <View style={styles.hour}></View>
        </TouchableOpacity>
        <Animated.View style={[{
            transform: [{ translateX: prObj.pans[8].x }, { translateY: prObj.pans[8].y }],
            top: "50%",
            left: "0%",
          }, overwriteStyle]} {...pr8.panHandlers}>
          <View style={styles.hour}></View>
        </Animated.View>
        <TouchableOpacity style={styles.nine}>
          <View style={styles.hour}></View>
        </TouchableOpacity>

        <Animated.View style={[{
            transform: [{ translateX: prObj.pans[9].x }, { translateY: prObj.pans[9].y }],
            top: "25%",
            left: "6.7%",
          }, overwriteStyle]} {...pr9.panHandlers}>
          <View style={styles.hour}></View>
        </Animated.View>
        <TouchableOpacity style={styles.ten}>
          <View style={styles.hour}></View>
        </TouchableOpacity>

        <Animated.View style={[{
            transform: [{ translateX: prObj.pans[10].x }, { translateY: prObj.pans[10].y }],
            top: "6.7%",
            left: "25%",
          }, overwriteStyle]} {...pr10.panHandlers}>
          <View style={styles.hour}></View>
        </Animated.View>
        <TouchableOpacity style={styles.eleven}>
          <View style={styles.hour}></View>
        </TouchableOpacity>

        <Text style={styles.text}>AM / PM</Text>
        {/* <Text style={styles.text}>{touchPos}</Text> */}
      </View>
      
      <View style={styles.dropZone}>
        <Text style={styles.text}>Drop them here!</Text>
      </View>

    </Animated.View>
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
    fontSize: 20,
    fontWeight: "400",
    // letterSpacing: 1,
  },
  dateContainer: {
    position: "absolute",
    top: 20,
    borderColor: "black",
    borderRadius: 3,
    backgroundColor: "rgb(30,30,30)",
    height: 34,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  date: {
    fontSize: 16,
    marginHorizontal:10,
    color: 'rgb(230,230,230)',
  },
  icons: {
    width: 36,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  innerClockContainer: {
    top: -40,
    // backgroundColor:"grey",
    width: "46%",
    aspectRatio: 1 / 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  dropZone: {
    width: "100%",
    backgroundColor: "white",
    height: 50,
    zIndex: -1,
    position: "absolute",
    bottom: 100,
  },

  hour: {
    // height: 1,
    // width: 1,
    backgroundColor: "red",
    position: "absolute",
    padding: 7,
    borderRadius: 14,
    marginLeft: 11,
    marginTop: 11,
  },
  one: {
    position: "absolute",
    top: "6.7%",
    left: "75%",
    marginLeft: -18,
    marginTop: -18,
    // backgroundColor: "white",
    padding: 18,
    borderRadius: 18,
  },
  two: {
    position: "absolute",
    top: "25%",
    left: "93.3%",
    marginLeft: -18,
    marginTop: -18,
    // backgroundColor: "white",
    padding: 18,
    borderRadius: 18,
  },
  three: {
    position: "absolute",
    top: "50%",
    left: "100%",
    marginLeft: -18,
    marginTop: -18,
    // backgroundColor: "white",
    padding: 18,
    borderRadius: 18,
  },
  four: {
    position: "absolute",
    top: "75%",
    left: "93.3%",
    marginLeft: -18,
    marginTop: -18,
    // backgroundColor: "white",
    padding: 18,
    borderRadius: 18,
  },
  five: {
    position: "absolute",
    top: "93.3%",
    left: "75%",
    marginLeft: -18,
    marginTop: -18,
    // backgroundColor: "white",
    padding: 18,
    borderRadius: 18,
  },
  six: {
    position: "absolute",
    top: "100%",
    left: "50%",
    marginLeft: -18,
    marginTop: -18,
    // backgroundColor: "white",
    padding: 18,
    borderRadius: 18,
  },
  seven: {
    position: "absolute",
    top: "93.3%",
    left: "25%",
    marginLeft: -18,
    marginTop: -18,
    // backgroundColor: "white",
    padding: 18,
    borderRadius: 18,
  },
  eight: {
    position: "absolute",
    top: "75%",
    left: "6.7%",
    marginLeft: -18,
    marginTop: -18,
    // backgroundColor: "white",
    padding: 18,
    borderRadius: 18,
  },
  nine: {
    position: "absolute",
    top: "50%",
    left: "0%",
    marginLeft: -18,
    marginTop: -18,
    // backgroundColor: "white",
    padding: 18,
    borderRadius: 18,
  },
  ten: {
    position: "absolute",
    top: "25%",
    left: "6.7%",
    marginLeft: -18,
    marginTop: -18,
    // backgroundColor: "white",
    padding: 18,
    borderRadius: 18,
  },
  eleven: {
    position: "absolute",
    top: "6.7%",
    left: "25%",
    marginLeft: -18,
    marginTop: -18,
    // backgroundColor: "white",
    padding: 18,
    borderRadius: 18,
  },
  twelve: {
    position: "absolute",
    top: 0,
    left: "50%",
    marginLeft: -18,
    marginTop: -18,
    // backgroundColor: "white",
    padding: 18,
    borderRadius: 18,
  },

})

export default InputStart