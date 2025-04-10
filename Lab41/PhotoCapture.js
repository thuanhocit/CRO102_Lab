// PhotoCapture.js
import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Text } from 'react-native'; // Import Text
import * as ImagePicker from 'expo-image-picker';

const PhotoCapture = () => {
    const [avatar, setAvatar] = useState(null);

    const requestPermission = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access camera is required!');
        }
    };

    const takePhoto = async () => {
        await requestPermission();

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.8,
        });

        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Chụp ảnh" onPress={takePhoto} />
            <View style={styles.avatarContainer}>
                {avatar ? (
                    <Image source={{ uri: avatar }} style={styles.avatar} />
                ) : (
                    <Image
                        source={require('../assets/icon.png')}
                        style={styles.avatar}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    avatarContainer: {
        marginTop: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});

export default PhotoCapture;
