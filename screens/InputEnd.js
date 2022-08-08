import React, { forwardRef, useRef, useImperativeHandle, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, PanResponder } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const InputEnd = forwardRef((props, ref) => {
  const [dayOffset, setDayOffset] = useState(0)
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(-1)
  const [AMPM, setAMPM] = useState("PM")
  
  const hourColor = "rgb(40,40,45)"

  const minuteView0 = useRef(null);
  const minuteView1 = useRef(null);
  const minuteView2 = useRef(null);
  const minuteView3 = useRef(null);
  const minuteView4 = useRef(null);
  const minuteView5 = useRef(null);
  const minuteView6 = useRef(null);
  const minuteView7 = useRef(null);
  const minuteView8 = useRef(null);
  const minuteView9 = useRef(null);
  const minuteView10 = useRef(null);
  const minuteView11 = useRef(null);

  var whichDZ = -1

  useImperativeHandle(ref, () => ({
    calculateDate() {
      if (minute == -1) {
        // Should catch error
        alert("Enter a time")
        return null
      }
      var adjustedHour
      if (AMPM == "AM") {
        if (hour == 12) {
          adjustedHour = 0
        } else {
          adjustedHour = hour
        }
      } else {
        if (hour == 12) {
          adjustedHour = hour
        } else {
          adjustedHour = hour + 12
        }
      } 
      var date = new Date(Date.now() - 86400000 * dayOffset).getDate()
      var month = new Date(Date.now() - 86400000 * dayOffset).getMonth();
      var year = new Date(Date.now() - 86400000 * dayOffset).getFullYear();
  
      var calculatedDate = new Date(year, month, date, adjustedHour, minute)
      alert(saved)
      
      return calculatedDate
    }
  }))

  const getSelectedDate = () => {
    var date = new Date(Date.now() - 86400000 * dayOffset).getDate()
    var month = new Date(Date.now() - 86400000 * dayOffset).getMonth() + 1;
    var dateString = (date < 10) ? ("0" + date.toString()) : date.toString()
    var monthString = (month < 10) ? ("0" + month.toString()) : month.toString()
    return dateString + '/' + monthString;
  }

  const displayHour = () => {
    if (hour < 10) {
      return "0" + hour
    } else {
      return hour.toString()
    }
  }

  const displayMin = () => {
    if (minute < 10 && minute > -1) {
      return "0" + minute
    } else if (minute == -1) {
      return "00" 
    } else {
      return minute.toString()
    }
  }

  const setDropZone = ( gesture ) => {
    // console.log("1",gesture.moveY, gesture.moveX)
    var gmY = gesture.moveY
    var gmX = gesture.moveX
    var ret = 0

    minuteView0.current.measure((x, y, width, height, pagex, pagey) => {
      if ((gmY > pagey && gmY < pagey+height) && (gmX > pagex && gmX < pagex+width)) {
        ret = 1
        whichDZ = 0
        console.log("0 DIDNT failed")
      }
    })
    minuteView1.current.measure((x, y, width, height, pagex, pagey) => {
      if ((gmY > pagey && gmY < pagey+height) && (gmX > pagex && gmX < pagex+width)) {
        ret = 1
        whichDZ = 5
      }
    })     
    minuteView2.current.measure((x, y, width, height, pagex, pagey) => {
      if ((gmY > pagey && gmY < pagey+height) && (gmX > pagex && gmX < pagex+width)) {
        ret = 1
        whichDZ = 10
      }
    })
    minuteView3.current.measure((x, y, width, height, pagex, pagey) => {
      if ((gmY > pagey && gmY < pagey+height) && (gmX > pagex && gmX < pagex+width)) {
        ret = 1
        whichDZ = 15
      }     
    })
    minuteView4.current.measure((x, y, width, height, pagex, pagey) => {
      if ((gmY > pagey && gmY < pagey+height) && (gmX > pagex && gmX < pagex+width)) {
        ret = 1
        whichDZ = 20
      }     
    })
    minuteView5.current.measure((x, y, width, height, pagex, pagey) => {
      if ((gmY > pagey && gmY < pagey+height) && (gmX > pagex && gmX < pagex+width)) {
        ret = 1
        whichDZ = 25
      }     
    })
    minuteView6.current.measure((x, y, width, height, pagex, pagey) => {
      if ((gmY > pagey && gmY < pagey+height) && (gmX > pagex && gmX < pagex+width)) {
        ret = 1
        whichDZ = 30
      }     
    })
    minuteView7.current.measure((x, y, width, height, pagex, pagey) => {
      if ((gmY > pagey && gmY < pagey+height) && (gmX > pagex && gmX < pagex+width)) {
        ret = 1
        whichDZ = 35
      }     
    })
    minuteView8.current.measure((x, y, width, height, pagex, pagey) => {
      if ((gmY > pagey && gmY < pagey+height) && (gmX > pagex && gmX < pagex+width)) {
        ret = 1
        whichDZ = 40
      }     
    })
    minuteView9.current.measure((x, y, width, height, pagex, pagey) => {
      if ((gmY > pagey && gmY < pagey+height) && (gmX > pagex && gmX < pagex+width)) {
        ret = 1
        whichDZ = 45
      }     
    })
    minuteView10.current.measure((x, y, width, height, pagex, pagey) => {
      if ((gmY > pagey && gmY < pagey+height) && (gmX > pagex && gmX < pagex+width)) {
        ret = 1
        whichDZ = 50
      }     
    })
    minuteView11.current.measure((x, y, width, height, pagex, pagey) => {
      if ((gmY > pagey && gmY < pagey+height) && (gmX > pagex && gmX < pagex+width)) {
        ret = 1
        whichDZ = 55
      }     
    })

    if (ret == 1) {
      return true
    } else {
      return false
    }
  }

   //  Pan responder for touch tracking
  var prObj = { "pans": {}, "panResponders" : {} }
  for (var i = 0; i < 12; i++) { 
    prObj["pans"][i] = useRef(new Animated.ValueXY()).current;
  }

  var pr11 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // console.log("ON MOVE")
        setHour(12)
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
        prObj["pans"][11].flattenOffset(); 
        setDropZone(gesture)
        setTimeout(() => {
          setMinute(whichDZ)
          console.log(whichDZ)
        }, 1); 
        prObj["pans"][11].x.setValue(0)
        prObj["pans"][11].y.setValue(0)
      }
    })
  ).current

  var pr0 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("ON MOVE")
        setHour(1)
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
        setDropZone(gesture)
        setTimeout(() => {
          setMinute(whichDZ)
        }, 1); 
        prObj["pans"][0].x.setValue(0)
        prObj["pans"][0].y.setValue(0)
      }
    })
  ).current
  
  var pr1 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("ON MOVE")
        setHour(2)
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
        setDropZone(gesture)
        setTimeout(() => {
          setMinute(whichDZ)
        }, 1); 
        prObj["pans"][1].x.setValue(0)
        prObj["pans"][1].y.setValue(0)
      }
    })
  ).current
  var pr2 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("ON MOVE")
        setHour(3)
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
        setDropZone(gesture)
        setTimeout(() => {
          setMinute(whichDZ)
        }, 1); 
        prObj["pans"][2].x.setValue(0)
        prObj["pans"][2].y.setValue(0)
      }
    })
  ).current
  var pr3 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("ON MOVE")
        setHour(4)
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
        setDropZone(gesture)
        setTimeout(() => {
          setMinute(whichDZ)
        }, 1); 
        prObj["pans"][3].x.setValue(0)
        prObj["pans"][3].y.setValue(0)
      }
    })
  ).current
  var pr4 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("ON MOVE")
        setHour(5)
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
        setDropZone(gesture)
        setTimeout(() => {
          setMinute(whichDZ)
        }, 1); 
        prObj["pans"][4].x.setValue(0)
        prObj["pans"][4].y.setValue(0)
      }
    })
  ).current
  var pr5 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("ON MOVE")
        setHour(6)
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
        setDropZone(gesture)
        setTimeout(() => {
          setMinute(whichDZ)
        }, 1); 
        prObj["pans"][5].x.setValue(0)
        prObj["pans"][5].y.setValue(0)
      }
    })
  ).current
  var pr6 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("ON MOVE")
        setHour(7)
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
        setDropZone(gesture)
        setTimeout(() => {
          setMinute(whichDZ)
        }, 1); 
        prObj["pans"][6].x.setValue(0)
        prObj["pans"][6].y.setValue(0)
      }
    })
  ).current
  var pr7 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("ON MOVE")
        setHour(8)
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
        setDropZone(gesture)
        setTimeout(() => {
          setMinute(whichDZ)
        }, 1); 
        prObj["pans"][7].x.setValue(0)
        prObj["pans"][7].y.setValue(0)
      }
    })
  ).current
  var pr8 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("ON MOVE")
        setHour(9)
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
        setDropZone(gesture)
        setTimeout(() => {
          setMinute(whichDZ)
        }, 1); 
        prObj["pans"][8].x.setValue(0)
        prObj["pans"][8].y.setValue(0)
      }
    })
  ).current
  var pr9 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("ON MOVE")
        setHour(10)
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
        setDropZone(gesture)
        setTimeout(() => {
          setMinute(whichDZ)
        }, 1); 
        prObj["pans"][9].x.setValue(0)
        prObj["pans"][9].y.setValue(0)
      }
    })
  ).current
  var pr10 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("ON MOVE")
        setHour(11)
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
        setDropZone(gesture)
        setTimeout(() => {
          setMinute(whichDZ)
        }, 1); 
        prObj["pans"][10].x.setValue(0)
        prObj["pans"][10].y.setValue(0)
      }
    })
  ).current

  const overwriteStyle = {
    position: "absolute",
    marginLeft: -20,
    marginTop: -20,
    padding: 20,
    borderRadius: 20,
    // backgroundColor: "blue",
    zIndex: 5,
  }

  const overwriteStyleUnder = {
    position: "absolute",
    marginLeft: -18,
    marginTop: -18,
    padding: 18,
    borderRadius: 18,
  }

  return (
    <Animated.View style={styles.container}>
{/* DATE */}
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
{/* CLOCK */}
      <View style={styles.outerClockContainer}> 
        <View style={styles.innerClockContainer}> 
{/* HOURS */}
          <Animated.View style={[{
              transform: [{ translateX: prObj.pans[11].x }, { translateY: prObj.pans[11].y }],
              top: "0%",
              left: "50%",
            }, overwriteStyle]} {...pr11.panHandlers}>
            <View style={[styles.hour, {backgroundColor: (hour == 12) ? "red" : hourColor}]}></View>
          </Animated.View>
          <TouchableOpacity style={[styles.twelve, overwriteStyleUnder]}>
            <View style={styles.hourUnder}></View>
          </TouchableOpacity>

          <Animated.View style={[{
              transform: [{ translateX: prObj.pans[0].x }, { translateY: prObj.pans[0].y }],
              top: "6.7%",
              left: "75%",
            }, overwriteStyle]} {...pr0.panHandlers}>
            <View style={[styles.hour, {backgroundColor: (hour == 1) ? "red" : hourColor}]}></View>
          </Animated.View>
          <TouchableOpacity style={[styles.one, overwriteStyleUnder]}>
            <View style={styles.hourUnder}></View>
          </TouchableOpacity>

          <Animated.View style={[{
              transform: [{ translateX: prObj.pans[1].x }, { translateY: prObj.pans[1].y }],
              top: "25%",
              left: "93.3%",
            }, overwriteStyle]} {...pr1.panHandlers}>
            <View style={[styles.hour, {backgroundColor: (hour == 2) ? "red" : hourColor}]}></View>
          </Animated.View>
          <TouchableOpacity style={[styles.two, overwriteStyleUnder]}>
            <View style={styles.hourUnder}></View>
          </TouchableOpacity>

          <Animated.View style={[{
              transform: [{ translateX: prObj.pans[2].x }, { translateY: prObj.pans[2].y }],
              top: "50%",
              left: "100%",
            }, overwriteStyle]} {...pr2.panHandlers}>
            <View style={[styles.hour, {backgroundColor: (hour == 3) ? "red" : hourColor}]}></View>
          </Animated.View>
          <TouchableOpacity style={[styles.three, overwriteStyleUnder]}>
            <View style={styles.hourUnder}></View>
          </TouchableOpacity>

          <Animated.View style={[{
              transform: [{ translateX: prObj.pans[3].x }, { translateY: prObj.pans[3].y }],
              top: "75%",
              left: "93.3%",
            }, overwriteStyle]} {...pr3.panHandlers}>
            <View style={[styles.hour, {backgroundColor: (hour == 4) ? "red" : hourColor}]}></View>
          </Animated.View>
          <TouchableOpacity style={[styles.four, overwriteStyleUnder]}>
            <View style={styles.hourUnder}></View>
          </TouchableOpacity>

          <Animated.View style={[{
              transform: [{ translateX: prObj.pans[4].x }, { translateY: prObj.pans[4].y }],
              top: "93.3%",
              left: "75%",
            }, overwriteStyle]} {...pr4.panHandlers}>
            <View style={[styles.hour, {backgroundColor: (hour == 5) ? "red" : hourColor}]}></View>
          </Animated.View>
          <TouchableOpacity style={[styles.five, overwriteStyleUnder]}>
            <View style={styles.hourUnder}></View>
          </TouchableOpacity>

          <Animated.View style={[{
              transform: [{ translateX: prObj.pans[5].x }, { translateY: prObj.pans[5].y }],
              top: "100%",
              left: "50%",
            }, overwriteStyle]} {...pr5.panHandlers}>
            <View style={[styles.hour, {backgroundColor: (hour == 6) ? "red" : hourColor}]}></View>
          </Animated.View>
          <TouchableOpacity style={[styles.six, overwriteStyleUnder]}>
            <View style={styles.hourUnder}></View>
          </TouchableOpacity>

          <Animated.View style={[{
              transform: [{ translateX: prObj.pans[6].x }, { translateY: prObj.pans[6].y }],
              top: "93.3%",
              left: "25%",
            }, overwriteStyle]} {...pr6.panHandlers}>
            <View style={[styles.hour, {backgroundColor: (hour == 7) ? "red" : hourColor}]}></View>
          </Animated.View>
          <TouchableOpacity style={[styles.seven, overwriteStyleUnder]}>
            <View style={styles.hourUnder}></View>
          </TouchableOpacity>

          <Animated.View style={[{
              transform: [{ translateX: prObj.pans[7].x }, { translateY: prObj.pans[7].y }],
              top: "75%",
              left: "6.7%",
            }, overwriteStyle]} {...pr7.panHandlers}>
            <View style={[styles.hour, {backgroundColor: (hour == 8) ? "red" : hourColor}]}></View>
          </Animated.View>

          <TouchableOpacity style={[styles.eight, overwriteStyleUnder]}>
            <View style={styles.hourUnder}></View>
          </TouchableOpacity>
          <Animated.View style={[{
              transform: [{ translateX: prObj.pans[8].x }, { translateY: prObj.pans[8].y }],
              top: "50%",
              left: "0%",
            }, overwriteStyle]} {...pr8.panHandlers}>
            <View style={[styles.hour, {backgroundColor: (hour == 9) ? "red" : hourColor}]}></View>
          </Animated.View>
          <TouchableOpacity style={[styles.nine, overwriteStyleUnder]}>
            <View style={styles.hourUnder}></View>
          </TouchableOpacity>

          <Animated.View style={[{
              transform: [{ translateX: prObj.pans[9].x }, { translateY: prObj.pans[9].y }],
              top: "25%",
              left: "6.7%",
            }, overwriteStyle]} {...pr9.panHandlers}>
            <View style={[styles.hour, {backgroundColor: (hour == 10) ? "red" : hourColor}]}></View>
          </Animated.View>
          <TouchableOpacity style={[styles.ten, overwriteStyleUnder]}>
            <View style={styles.hourUnder}></View>
          </TouchableOpacity>

          <Animated.View style={[{
              transform: [{ translateX: prObj.pans[10].x }, { translateY: prObj.pans[10].y }],
              top: "6.7%",
              left: "25%",
            }, overwriteStyle]} {...pr10.panHandlers}>
            <View style={[styles.hour, {backgroundColor: (hour == 11) ? "red" : hourColor}]}></View>
          </Animated.View>
          <TouchableOpacity style={[styles.eleven, overwriteStyleUnder]}>
            <View style={styles.hourUnder}></View>
          </TouchableOpacity>

          {/* <Text style={styles.text}>AM / PM</Text> */}
          <Text style={styles.text}>{displayHour() + " : " + displayMin()}</Text>
        </View>

{/* MINUTES */}
        <TouchableOpacity style={styles.twelveM} ref = {minuteView0}>
            <Text style={{ color: (minute == 0) ? "red" : "white"}}>00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.oneM}  ref = {minuteView1}>
            <Text style={{color: (minute == 5) ? "red" : "white"}}>05</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.twoM} ref = {minuteView2}>
            <Text style={{color: (minute == 10) ? "red" : "white"}}>10</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.threeM} ref = {minuteView3}>
          <Text style={{color: (minute == 15) ? "red" : "white"}}>15</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fourM} ref = {minuteView4}>
          <Text style={{color: (minute == 20) ? "red" : "white"}}>20</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fiveM} ref = {minuteView5}>
         <Text style={{color: (minute == 25) ? "red" : "white"}}>25</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sixM} ref = {minuteView6}>
          <Text style={{color: (minute == 30) ? "red" : "white"}}>30</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sevenM} ref = {minuteView7}>
          <Text style={{color: (minute == 35) ? "red" : "white"}}>35</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eightM} ref = {minuteView8}>
          <Text style={{color: (minute == 40) ? "red" : "white"}}>40</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nineM} ref = {minuteView9}>
          <Text style={{color: (minute == 45) ? "red" : "white"}}>45</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tenM} ref = {minuteView10}>
          <Text style={{color: (minute == 50) ? "red" : "white"}}>50</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.elevenM} ref = {minuteView11}>
          <Text style={{color: (minute == 55) ? "red" : "white"}}>55</Text>
        </TouchableOpacity>
        <View style={styles.minuteCircle}/>
        <View style={styles.northBar}/>
        <View style={styles.eastBar}/>
        <View style={styles.southBar}/>
        <View style={styles.westBar}/>
      </View>
{/* AM / PM */}
      <View style={styles.AMPMContainer}>
        <TouchableOpacity 
          style={styles.icons} 
          onPress={() => {
            if (AMPM == "AM") {
              setAMPM("PM")
            } else {
              setAMPM("AM")
            }
          }}>
          <Ionicons name="chevron-back-outline" 
            size={20} 
            color={"red"}/>
        </TouchableOpacity >
        <Text style={styles.date}>{AMPM}</Text>
        <TouchableOpacity 
          style={styles.icons} 
          onPress={() => {
            if (AMPM == "AM") {
              setAMPM("PM")
            } else {
              setAMPM("AM")
            }
          }}>
          <Ionicons name="chevron-forward-outline" 
            size={20} 
            color={"red"}/>
        </TouchableOpacity >
      </View>
    </Animated.View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  text: {
    color: 'rgb(220,220,220)',
    fontSize: 24,
    fontWeight: "400",
  },
  dateContainer: {
    position: "absolute",
    top: "12%",
    borderColor: "black",
    borderRadius: 50,
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
  AMPMContainer: {
    position: "absolute",
    top: "68%",
    borderColor: "black",
    borderRadius: 50,
    backgroundColor: "rgb(30,30,30)",
    height: 34,
    width: 135,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  icons: {
    width: 36,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  innerClockContainer: {
    // backgroundColor:"grey",
    width: "60%",
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
  outerClockContainer: {
    top: -54,
    // backgroundColor:"grey",
    width: 270,
    aspectRatio: 1 / 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  hour: {
    backgroundColor: "red",
    // backgroundColor: "rgb(70,70,70)",
    position: "absolute",
    // padding: 10,
    // borderRadius: 12,
    // marginLeft: 8,
    // marginTop: 8,
    padding: 8,
    borderRadius: 12,
    marginLeft: 12,
    marginTop: 12,
  },
  hourUnder: {
    backgroundColor: "rgb(220,220,220)",
    backgroundColor: "red",
    position: "absolute",
    padding: 6,
    borderRadius: 12,
    marginLeft: 12,
    marginTop: 12,
    zIndex: 0,
  },
  minute: {
    position: "absolute",
    zIndex: -1,
    top: "0%",
    left: "50%",
    backgroundColor: "blue",
    marginLeft: -30,
    marginTop: -31,
    padding: 22,
    borderRadius: 20,
  },
  minuteCircle: {
    position: "absolute",
    zIndex: -2,
    top: "0%",
    left: "0%",
    padding: 22,
    borderRadius: 600,
    borderWidth: 1,
    borderColor: "rgb(50,50,50)",
    height: "100%",
    width: "100%",
  },
  northBar: {
    top: "8%",
    left: "50%",
    height: "25%",
    width: 2,
    marginLeft: -1,
    backgroundColor: "rgb(25,25,25)",
    position: "absolute",
    zIndex: -2,
  },
  eastBar: {
    top: "50%",
    left: "67%",
    height: 2,
    marginTop: -1,
    width: "25%",
    backgroundColor: "rgb(25,25,25)",
    position: "absolute",
    zIndex: -2,
  },
  southBar: {
    top: "67%",
    left: "50%",
    height: "25%",
    width: 2,
    marginLeft: -1,
    backgroundColor: "rgb(25,25,25)",
    position: "absolute",
    zIndex: -2,
  },
  westBar: {
    top: "50%",
    left: "8%",
    height: 2,
    marginTop: -1,
    width: "25%",
    backgroundColor: "rgb(30,30,30)",
    position: "absolute",
    zIndex: -2,
  },
  one: {
    top: "6.7%",
    left: "75%",
  },
  two: {
    top: "25%",
    left: "93.3%",
  },
  three: {
    top: "50%",
    left: "100%",
  },
  four: {
    top: "75%",
    left: "93.3%",
  },
  five: {
    top: "93.3%",
    left: "75%",
  },
  six: {
    top: "100%",
    left: "50%",
  },
  seven: {
    top: "93.3%",
    left: "25%",
  },
  eight: {
    top: "75%",
    left: "6.7%",
  },
  nine: {
    top: "50%",
    left: "0%",
  },
  ten: {
    top: "25%",
    left: "6.7%",
  },
  eleven: {
    top: "6.7%",
    left: "25%",
  },
  twelve: {
    top: 0,
    left: "50%",
  },
  oneM: {
    top: "6.7%",
    left: "75%",
    position: "absolute",
    zIndex: -1,
    // backgroundColor: "green",
    marginLeft: -30,
    marginTop: -31,
    padding: 22,
    borderRadius: 20,
  },
  twoM: {
    top: "25%",
    left: "93.3%",
    position: "absolute",
    zIndex: -1,
    // backgroundColor: "blue",
    marginLeft: -30,
    marginTop: -31,
    padding: 22,
    borderRadius: 20,
  },
  threeM: {
    top: "50%",
    left: "100%",
    position: "absolute",
    zIndex: -1,
    marginLeft: -30,
    marginTop: -31,
    padding: 22,
    borderRadius: 20,
  },
  fourM: {
    top: "75%",
    left: "93.3%",
    position: "absolute",
    zIndex: -1,
    marginLeft: -30,
    marginTop: -31,
    padding: 22,
    borderRadius: 20,
  },
  fiveM: {
    top: "93.3%",
    left: "75%",
    position: "absolute",
    zIndex: -1,
    marginLeft: -30,
    marginTop: -31,
    padding: 22,
    borderRadius: 20,
  },
  sixM: {
    top: "100%",
    left: "50%",
    position: "absolute",
    zIndex: -1,
    marginLeft: -30,
    marginTop: -31,
    padding: 22,
    borderRadius: 20,
  },
  sevenM: {
    top: "93.3%",
    left: "25%",
    position: "absolute",
    zIndex: -1,
    marginLeft: -30,
    marginTop: -31,
    padding: 22,
    borderRadius: 20,
  },
  eightM: {
    top: "75%",
    left: "6.7%",
    position: "absolute",
    zIndex: -1,
    marginLeft: -30,
    marginTop: -31,
    padding: 22,
    borderRadius: 20,
  },
  nineM: {
    top: "50%",
    left: "0%",
    position: "absolute",
    zIndex: -1,
    marginLeft: -30,
    marginTop: -31,
    padding: 22,
    borderRadius: 20,
  },
  tenM: {
    top: "25%",
    left: "6.7%",
    position: "absolute",
    zIndex: -1,
    marginLeft: -30,
    marginTop: -31,
    padding: 22,
    borderRadius: 20,
  },
  elevenM: {
    position: "absolute",
    // backgroundColor: "blue",
    top: "6.7%",
    left: "25%",
    zIndex: -1,
    marginLeft: -30,
    marginTop: -31,
    padding: 22,
    borderRadius: 20,
  },
  twelveM: {
    top: 0,
    left: "50%",
    position: "absolute",
    zIndex: -1,
    marginLeft: -30,
    marginTop: -31,
    padding: 22,
    borderRadius: 20,
  },
})

export default InputEnd