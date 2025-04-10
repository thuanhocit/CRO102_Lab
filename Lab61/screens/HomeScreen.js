import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { increment, decrement, multiply, RESET_COUNTER } from '../redux/counterSlice';

export default function HomeScreen() {
  const counter = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>{counter}</Text>

      <View style={styles.button}>
        <Button title="Tăng biến đếm" color="orange" onPress={() => dispatch(increment())} />
      </View>

      <View style={styles.button}>
        <Button title="Giảm biến đếm" color="orange" onPress={() => dispatch(decrement())} />
      </View>

      <View style={styles.button}>
        <Button title="Mũ bình phương biến đếm" color="orange" onPress={() => dispatch(multiply(3))} />
      </View>

      <View style={styles.button}>
        <Button title="Reset biến đếm" color="orange" onPress={() => dispatch(RESET_COUNTER)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
  counterText: {
    fontSize: 48, marginBottom: 20,
  },
  button: {
    marginVertical: 5, width: '70%',
  },
});
