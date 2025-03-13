import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DetailScreen = ({ route, navigation }) => {
  const { hotel } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' }}
          style={styles.headerImage}
          resizeMode="cover"
        />
        <View style={styles.headerOverlay}>
          <Text style={styles.hotelName}>{hotel.name}</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name={star <= Math.floor(hotel.rating) ? "star" : star <= hotel.rating ? "star-half" : "star-outline"}
                size={16}
                color="#FFD700"
                style={{ marginRight: 2 }}
              />
            ))}
            <Text style={styles.ratingText}>{hotel.rating}</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin</Text>
          <View style={styles.infoRow}>
            <Ionicons name="location" size={18} color="#666" />
            <Text style={styles.infoText}>{hotel.address}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="time" size={18} color="#666" />
            <Text style={styles.infoText}>Giờ mở cửa: {hotel.openingHours}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mô tả</Text>
          <Text style={styles.descriptionText}>{hotel.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tiện nghi</Text>
          <View style={styles.amenitiesContainer}>
            {hotel.amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <Ionicons 
                  name={getAmenityIcon(amenity)} 
                  size={18} 
                  color="#0099ff" 
                />
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>ĐẶT PHÒNG NGAY</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Helper function to map amenities to icons
const getAmenityIcon = (amenity) => {
  const amenityMap = {
    'Hồ bơi': 'water',
    'Nhà hàng': 'restaurant',
    'Spa': 'fitness',
    'Phòng gym': 'barbell',
    'WiFi miễn phí': 'wifi'
  };
  
  return amenityMap[amenity] || 'checkmark-circle';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    position: 'relative',
    height: 200,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
  },
  hotelName: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    color: 'white',
    marginLeft: 4,
  },
  content: {
    padding: 16,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 8,
  },
  descriptionText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  amenityText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 4,
  },
  bookButton: {
    backgroundColor: '#0099ff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  bookButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DetailScreen;