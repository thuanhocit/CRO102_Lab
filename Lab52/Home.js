import React from "react";
import { View, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { setImage } from "./redux/imageSlice";

const Home = () => {
    const dispatch = useDispatch();
    const imageUri = useSelector((state) => state.image.imageUri);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            console.log("Quyền bị từ chối");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (result.canceled || !result.assets?.length) {
            return;
        }

        dispatch(setImage(result.assets[0].uri));
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button title="Chọn ảnh" onPress={pickImage} />
            {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
        </View>
    );
};

export default Home;
