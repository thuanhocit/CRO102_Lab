"use client"

import { View, Text, StyleSheet, SafeAreaView, StatusBar, Platform } from "react-native"
import { useCallback, useEffect, useState, useMemo } from "react"
import Header from "./Header"
import Body from "./Body"
import Footer from "./Footer"
import { LinearGradient } from "expo-linear-gradient"

// Define a more vibrant color palette
const colors = [
  "#FF6B6B", // coral red
  "#4ECDC4", // turquoise
  "#FFD166", // yellow
  "#6A0572", // purple
  "#FF9A8B", // salmon
  "#00F5FF", // cyan
  "#845EC2", // lavender
  "#008B8B", // teal
  "#FF85B3", // pink
  "#FFC75F", // amber
]

export default function Main() {
  const [user, setUser] = useState({
    name: "Thầy ông nội",
    avatar: "https://i.pinimg.com/736x/79/37/b2/7937b2a694f81472970d3d4e9b706a45.jpg",
  })

  const [lastTimeUpdate, setLastTimeUpdate] = useState("Chưa điền vào thông tin")
  const [footerColor, setFooterColor] = useState(colors[0])

  // Format date time in a cleaner way
  const formatDateTime = (date) => {
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    const seconds = date.getSeconds().toString().padStart(2, "0")

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
  }

  // Random color with smooth transition
  const handleRandomColor = useCallback(() => {
    let newColorIndex
    do {
      newColorIndex = Math.floor(Math.random() * colors.length)
    } while (colors[newColorIndex] === footerColor) // Ensure we get a different color

    setFooterColor(colors[newColorIndex])
  }, [footerColor])

  // Update time when user changes
  useEffect(() => {
    const currentDate = new Date()
    setLastTimeUpdate(formatDateTime(currentDate))
  }, [user])

  // Update user information
  const handleUpdateInfo = useCallback((updatedUser) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedUser }))
  }, [])

  // Replace the existing gradientColors useMemo with this more dynamic one
  const gradientColors = useMemo(() => {
    // More vibrant gradient options
    const gradientOptions = [
      ["#4158D0", "#C850C0", "#FFCC70"], // Purple to pink to yellow
      ["#0093E9", "#80D0C7"], // Blue to teal
      ["#8EC5FC", "#E0C3FC"], // Light blue to lavender
      ["#D9AFD9", "#97D9E1"], // Pink to light blue
      ["#0700b8", "#00ff88"], // Deep blue to mint
    ]

    // Select a gradient option (you could also randomize this)
    return gradientOptions[0]
  }, [])

  // Replace the LinearGradient component with this enhanced version
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={gradientColors} style={styles.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View style={styles.backgroundPattern}>
          {/* Create a grid of circles for better coverage */}
          {Array.from({ length: 20 }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.patternCircle,
                {
                  top: `${(index % 5) * 25}%`,
                  left: `${Math.floor(index / 5) * 25}%`,
                  width: 250 + Math.random() * 100,
                  height: 250 + Math.random() * 100,
                  opacity: 0.04 + Math.random() * 0.05,
                },
              ]}
            />
          ))}
        </View>
        <Text style={styles.titleText}>REACT NATIVE HOOKS</Text>
        <View style={styles.contentContainer}>
          <Header user={user} />
          <Body onUpdateInfo={handleUpdateInfo} onClickChangeBgFooter={handleRandomColor} />
          <Footer timeUpdate={lastTimeUpdate} backgroundColor={footerColor} />
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

// Add these new styles to the StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradient: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  backgroundPattern: {
    position: "absolute",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  patternCircle: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "white",
    transform: [{ translateX: -125 }, { translateY: -125 }], // Center the circles on their position
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    gap: 16,
    zIndex: 1, // Ensure content is above the background
  },
  titleText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 20,
    letterSpacing: 1.5,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    zIndex: 1, // Ensure text is above the background
  },
})

