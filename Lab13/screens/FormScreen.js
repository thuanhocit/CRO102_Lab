import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import FormInput from '../components/FormInput';

const FormScreen = () => {
  const [formData, setFormData] = useState({
    field1: '',
    field2: '',
    field3: '',
    field4: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Validate required fields
    if (!formData.field1.trim()) {
      newErrors.field1 = 'This field is required';
    }

    if (!formData.field4.trim()) {
      newErrors.field4 = 'This field is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Handle form submission
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        {/* Default Input */}
        <FormInput
          label="Tittle"
          placeholder="Place holder"
          required
          value={formData.field1}
          onChangeText={(text) => {
            setFormData({ ...formData, field1: text });
            if (errors.field1) {
              setErrors({ ...errors, field1: '' });
            }
          }}
          error={errors.field1}
        />

        {/* Focused Input (will show focus state when user interacts) */}
        <FormInput
          label="Tittle"
          placeholder="Place holder"
          required
          value={formData.field2}
          onChangeText={(text) => setFormData({ ...formData, field2: text })}
        />

        {/* Disabled Input */}
        <FormInput
          label="Tittle"
          placeholder="Place holder"
          disabled
          value={formData.field3}
          onChangeText={(text) => setFormData({ ...formData, field3: text })}
        />

        {/* Error Input */}
        <FormInput
          label="Tittle"
          placeholder="Place holder"
          required
          value={formData.field4}
          onChangeText={(text) => {
            setFormData({ ...formData, field4: text });
            if (errors.field4) {
              setErrors({ ...errors, field4: '' });
            }
          }}
          error={errors.field4}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 16,
  },
  submitButton: {
    backgroundColor: '#0d6efd',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FormScreen;