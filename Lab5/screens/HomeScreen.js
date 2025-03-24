import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, fetchTodos } from '../redux/todoSlice';
import TodoItem from '../components/TodoItem';

const HomeScreen = () => {
  const [todoText, setTodoText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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
    if (!todoText.trim()) {
      setErrorMessage('⚠️ Vui lòng nhập công việc!');
      return;
    }
    dispatch(addTodo(todoText));
    setTodoText('');
    setErrorMessage('');
  };

  const renderItem = ({ item }) => {
    const title = item.key || item.title;
    return <TodoItem title={title} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>✅ To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="✍️ Nhập công việc..."
          value={todoText}
          onChangeText={setTodoText}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.addButtonText}>➕ Thêm</Text>
        </TouchableOpacity>
      </View>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {status === 'loading' && !isRefreshing && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ff9800" />
          <Text style={styles.loadingText}>⏳ Đang tải danh sách...</Text>
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
            <Text style={styles.emptyText}>🎉 Không có công việc nào, hãy thêm ngay!</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
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
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#ff5722',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
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
    fontStyle: 'italic',
  },
});

export default HomeScreen;
