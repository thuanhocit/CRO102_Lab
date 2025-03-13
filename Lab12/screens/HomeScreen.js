import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  StatusBar,
  ActivityIndicator 
} from 'react-native';

// Sample data - in a real app, this would come from an API
const SAMPLE_DATA = {
  itinerary: {
    destination: 'Hồ Tràm, Vũng Tàu',
    date: '12/12/2024',
    timeRange: '09:00 AM - 12:00 AM',
    transportation: 'Xe bus',
    travelTime: '21:00 - 22:00',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80'
  },
  hotel: {
    name: 'Hồng Quỳnh',
    openingHours: '06:00 AM - 12:00 AM',
    address: '234 Quang Trung, Hồ Chí Minh',
    id: '123',
    description: 'Khách sạn sang trọng với đầy đủ tiện nghi, gần biển và các điểm du lịch nổi tiếng.',
    amenities: ['Hồ bơi', 'Nhà hàng', 'Spa', 'Phòng gym', 'WiFi miễn phí'],
    rating: 4.5
  }
};

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate API fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, you would fetch from an API
        // const response = await fetch('your-api-endpoint');
        // const result = await response.json();
        
        // Simulate network delay
        setTimeout(() => {
          setData(SAMPLE_DATA);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0099ff" />
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Itinerary Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Lịch trình</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Địa điểm</Text>
            <Text style={styles.infoValue}>{data.itinerary.destination}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Thời gian</Text>
            <Text style={styles.infoValue}>{data.itinerary.timeRange}, {data.itinerary.date}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phương tiện di chuyển</Text>
            <Text style={styles.infoValue}>{data.itinerary.transportation}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Thời gian</Text>
            <Text style={styles.infoValue}>{data.itinerary.travelTime}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Hình ảnh</Text>
          </View>
          
          <Image
            source={{ uri: data.itinerary.image }}
            style={styles.beachImage}
            resizeMode="cover"
          />
        </View>
        
        {/* Hotel Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Khách sạn</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tên khách sạn</Text>
            <Text style={styles.infoValue}>{data.hotel.name}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Giờ mở cửa</Text>
            <Text style={styles.infoValue}>{data.hotel.openingHours}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Địa điểm</Text>
            <Text style={styles.infoValue}>{data.hotel.address}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.detailButton} 
            onPress={() => navigation.navigate('Detail', { hotel: data.hotel })}
          >
            <Text style={styles.detailButtonText}>CHI TIẾT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  scrollView: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  infoRow: {
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  beachImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginTop: 4,
  },
  detailButton: {
    backgroundColor: '#0099ff',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  detailButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default HomeScreen;