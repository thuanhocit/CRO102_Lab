import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  Text, 
  SafeAreaView, 
  StatusBar,
  Dimensions
} from 'react-native';
import ListItem from './Lab32/ListItem';

const { width } = Dimensions.get('window');

// Generate dummy data
const generateData = (count) => {
  return Array(count).fill(0).map((_, index) => ({
    id: `item-${index}`,
    title: `Item ${index + 1}`,
  }));
};

export default function App() {
  const [data] = useState(generateData(20));
  const [viewableItems, setViewableItems] = useState([]);
  
  const onViewableItemsChanged = useRef(({ viewableItems: vItems }) => {
    setViewableItems(vItems);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  }).current;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Animated List</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem item={item} viewableItems={viewableItems} />
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  listContent: {
    padding: 16,
  },
});