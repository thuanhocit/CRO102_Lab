// src/screens/SignupScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FormInput from '../components/FormInput';
import { useSignupMutation } from '../api/authApi';

// Component màn hình đăng ký
const SignupScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
    gender: 'male',
  });

  const [signup, { isLoading, error }] = useSignupMutation();

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const result = await signup({
        name: formData.name,
        age: parseInt(formData.age),
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
      }).unwrap();
      console.log('Đăng ký thành công:', result);
      alert(`Đăng ký thành công! ID: ${result.id}, Tên: ${result.name}`);
    } catch (err) {
      console.error('Đăng ký thất bại:', err);
      console.log('Chi tiết lỗi:', {
        status: err.status,
        data: err.data,
        message: err.message,
        originalError: err.originalError,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form Builder Basic Demo</Text>

      <FormInput
        label="Tên*"
        value={formData.name}
        onChangeText={(text) => handleInputChange('name', text)}
        placeholder="Nhập tên của bạn"
      />
      <FormInput
        label="Tuổi*"
        value={formData.age}
        onChangeText={(text) => handleInputChange('age', text)}
        placeholder="Nhập tuổi của bạn"
      />
      <FormInput
        label="Email*"
        value={formData.email}
        onChangeText={(text) => handleInputChange('email', text)}
        placeholder="Nhập email của bạn"
      />
      <FormInput
        label="Mật khẩu*"
        value={formData.password}
        onChangeText={(text) => handleInputChange('password', text)}
        placeholder="Nhập mật khẩu của bạn"
        secureTextEntry
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Giới tính*</Text>
        <Picker
          selectedValue={formData.gender}
          style={styles.picker}
          onValueChange={(itemValue) => handleInputChange('gender', itemValue)}
        >
          <Picker.Item label="Nam" value="male" />
          <Picker.Item label="Nữ" value="female" />
          <Picker.Item label="Khác" value="other" />
        </Picker>
      </View>

      <Button
        title="Gửi"
        color="#00b7eb"
        onPress={handleSubmit}
        disabled={isLoading}
      />
      {error && (
        <Text style={styles.error}>
          Lỗi: {error.status} -{' '}
          {error.message === 'Network request failed'
            ? 'Không thể kết nối đến server. Kiểm tra kết nối mạng hoặc API.'
            : error.data?.message || error.message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  pickerContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default SignupScreen;