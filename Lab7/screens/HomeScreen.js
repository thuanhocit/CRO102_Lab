"use client"

import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from "react-native"
import { auth, db } from "../firebase/config"
import { collection, query, where, getDocs } from "firebase/firestore"
import { signOut } from "firebase/auth"

const HomeScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchUserInfo = async () => {
    try {
      const user = auth.currentUser
      if (!user) throw new Error("Không tìm thấy người dùng")

      const q = query(collection(db, "users"), where("email", "==", user.email))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data()
        setUserInfo({
          email: user.email,
          name: data.name || "Không có tên",
          phone: data.phone || "Chưa cập nhật số điện thoại",
        })
      } else {
        throw new Error("Không tìm thấy thông tin người dùng")
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error)
      Alert.alert("Lỗi", error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigation.replace("Login")
    } catch (error) {
      Alert.alert("Lỗi đăng xuất", error.message)
    }
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#009245" />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userInfo?.email}</Text>

        <Text style={styles.label}>Tên:</Text>
        <Text style={styles.value}>{userInfo?.name}</Text>

        <Text style={styles.label}>Số điện thoại:</Text>
        <Text style={styles.value}>{userInfo?.phone}</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
  content: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "#009245",
    marginTop: 30,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default HomeScreen
