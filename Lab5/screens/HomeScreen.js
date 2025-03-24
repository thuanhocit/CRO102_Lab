import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, fetchTodos } from '../redux/todoSlice';
import TodoItem from '../components/TodoItem';
import { Feather } from '@expo/vector-icons'; // Sử dụng icon từ Feather

const HomeScreen = () => {
  const [todoText, setTodoText] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const status = useSelector((state) => state.todos.status);

  useEffect(() => {
    loadTodos();
  }, [dispatch]);

  const loadTodos = async () => {
    try {
      await dispatch(fetchTodos()).unwrap();
    } catch (error) {
      console.error('Failed to load todos:', error);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadTodos();
    setIsRefreshing(false);
  };

  const handleAddTodo = () => {
    if (todoText.trim()) {
      dispatch(addTodo(todoText));
      setTodoText('');
    }
  };

  const renderItem = ({ item }) => {
    const title = item.key || item.title;
    return <TodoItem title={title} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Text style={styles.header}>📌 Công việc của bạn</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Thêm công việc mới..."
            value={todoText}
            onChangeText={setTodoText}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
            <Feather name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {status === 'loading' && !isRefreshing && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6200ea" />
            <Text style={styles.loadingText}>Đang tải danh sách...</Text>
          </View>
        )}

        {status === 'succeeded' && (
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            style={styles.list}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            ListEmptyComponent={() => (
              <Text style={styles.emptyText}>🎉 Không có công việc nào!</Text>
            )}
          />
        )}

        {status === 'failed' && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>⚠️ Lỗi tải dữ liệu!</Text>
            <TouchableOpacity style={styles.retryButton} onPress={loadTodos}>
              <Text style={styles.retryText}>🔄 Thử lại</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#6200ea',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  retryText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#666',
    fontSize: 18,
  },
});

export default HomeScreen;