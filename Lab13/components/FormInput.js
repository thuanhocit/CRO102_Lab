import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FormInput = ({
  label,
  placeholder,
  required = false,
  error = '',
  disabled = false,
  value,
  onChangeText,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {required && <Text style={styles.required}>*</Text>}
      </View>
      
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          disabled && styles.inputDisabled,
          error && styles.inputError,
        ]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        editable={!disabled}
        value={value}
        onChangeText={onChangeText}
      />
      
      {error && (
        <View style={styles.errorContainer}>
          <Icon name="error-outline" size={16} color="#dc3545" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  required: {
    color: '#dc3545',
    marginLeft: 4,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputFocused: {
    borderColor: '#0d6efd',
    borderWidth: 2,
  },
  inputDisabled: {
    backgroundColor: '#f8f9fa',
    borderColor: '#ced4da',
  },
  inputError: {
    borderColor: '#dc3545',
    backgroundColor: '#fff8f8',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 14,
    marginLeft: 6,
  },
});

export default FormInput;