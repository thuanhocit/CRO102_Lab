"use client"

import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, Alert } from "react-native"
import { useState, memo, useRef } from "react"
import { Ionicons } from "@expo/vector-icons"

function Body({ onUpdateInfo, onClickChangeBgFooter }) {
  const [name, setName] = useState("")
  const [avatar, setAvatar] = useState("")
  const [errors, setErrors] = useState({
    name: false,
    avatar: false,
  })

  // Tham chiếu cho các đầu vào để cho phép quản lý tiêu điểm
  const avatarInputRef = useRef(null)

  // Xác thực các trường biểu mẫu
  const validateForm = () => {
    const newErrors = {
      name: !name.trim(),
      avatar: !avatar.trim(),
    }

    setErrors(newErrors)

    // Kiểm tra xem có trường nào có lỗi không
    return !Object.values(newErrors).some((error) => error)
  }

  const handleSubmit = () => {
    if (validateForm()) {
      // Tất cả các trường đều hợp lệ, tiến hành cập nhật
      onUpdateInfo({
        name: name.trim(),
        avatar: avatar.trim(),
      })

      // Reset form
      setName("")
      setAvatar("")
      setErrors({ name: false, avatar: false })
      Keyboard.dismiss()
    } else {
      // Show error message
      Alert.alert("Thông tin không đầy đủ", "Vui lòng nhập đầy đủ tên và đường dẫn hình ảnh", [
        { text: "Đã hiểu", style: "default" },
      ])
    }
  }

  // Xử lý tiêu điểm đầu vào khi nhấn Enter/Return
  const handleNameSubmit = () => {
    if (avatarInputRef.current) {
      avatarInputRef.current.focus()
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Profile</Text>

      <View style={[styles.inputContainer, errors.name && styles.inputError]}>
        <Ionicons name="person-outline" size={20} color={errors.name ? "#FF6B6B" : "#666"} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={(text) => {
            setName(text)
            if (text.trim()) setErrors((prev) => ({ ...prev, name: false }))
          }}
          placeholderTextColor="#999"
          returnKeyType="next"
          onSubmitEditing={handleNameSubmit}
        />
        {errors.name && <Ionicons name="alert-circle" size={20} color="#FF6B6B" style={styles.errorIcon} />}
      </View>

      <View style={[styles.inputContainer, errors.avatar && styles.inputError]}>
        <Ionicons name="image-outline" size={20} color={errors.avatar ? "#FF6B6B" : "#666"} style={styles.inputIcon} />
        <TextInput
          ref={avatarInputRef}
          style={styles.input}
          placeholder="Enter avatar URL"
          value={avatar}
          onChangeText={(text) => {
            setAvatar(text)
            if (text.trim()) setErrors((prev) => ({ ...prev, avatar: false }))
          }}
          placeholderTextColor="#999"
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
        {errors.avatar && <Ionicons name="alert-circle" size={20} color="#FF6B6B" style={styles.errorIcon} />}
      </View>

      {(errors.name || errors.avatar) && <Text style={styles.errorText}>Vui lòng nhập đầy đủ thông tin</Text>}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={handleSubmit} activeOpacity={0.8}>
          <Ionicons name="save-outline" size={18} color="white" />
          <Text style={styles.buttonText}>Update Info</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.colorButton]}
          onPress={onClickChangeBgFooter}
          activeOpacity={0.8}
        >
          <Ionicons name="color-palette-outline" size={18} color="white" />
          <Text style={styles.buttonText}>Change Color</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  inputError: {
    borderColor: "#FF6B6B",
    backgroundColor: "rgba(255, 107, 107, 0.05)",
  },
  inputIcon: {
    marginRight: 8,
  },
  errorIcon: {
    marginLeft: 8,
  },
  input: {
    flex: 1,
    height: 46,
    color: "#333",
    fontSize: 16,
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 14,
    marginBottom: 12,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  updateButton: {
    backgroundColor: "#4ECDC4",
  },
  colorButton: {
    backgroundColor: "#FF6B6B",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 6,
  },
})

export default memo(Body)

