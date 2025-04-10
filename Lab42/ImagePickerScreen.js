import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ImagePickerScreen = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const pickImage = async () => {
        // Yêu cầu quyền truy cập thư viện ảnh
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Bạn cần cấp quyền để chọn ảnh!");
            return;
        }

        // Mở thư viện ảnh
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1], // Crop ảnh vuông
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={selectedImage ? { uri: selectedImage } : require("../assets/icon.png")}
                style={styles.image}
            />
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Chọn ảnh từ thư viện</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#FF9800",
        padding: 15,
        borderRadius: 10,
        width: 300,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default ImagePickerScreen;
