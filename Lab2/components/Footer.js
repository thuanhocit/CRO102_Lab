"use client"

import { View, Text, StyleSheet, Animated } from "react-native"
import { memo, useRef, useEffect } from "react"
import { Ionicons } from "@expo/vector-icons"

function Footer({ timeUpdate, backgroundColor }) {
  // Animation for color change
  const colorAnimation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(colorAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      colorAnimation.setValue(0)
    })
  }, [backgroundColor])

  const animatedStyle = {
    backgroundColor,
    transform: [
      {
        scale: colorAnimation.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 1.03, 1],
        }),
      },
    ],
  }

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.content}>
        <Ionicons name="time-outline" size={20} color="white" />
        <Text style={styles.timeText}>Last updated: {timeUpdate}</Text>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  timeText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "500",
    fontSize: 14,
  },
})

export default memo(Footer)

