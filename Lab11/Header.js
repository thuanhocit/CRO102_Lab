import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Dùng icon Material

const Header = ({
  title = "Title",
  leftComponent,
  rightComponent,
  iconLeft = "arrow-back", // Icon mặc định bên trái
  iconLeftColor = "#fff",
  onPressLeft,
  leftIconSize = 24,
  iconRight = "person", // Icon mặc định bên phải
  iconRightColor = "#fff",
  onPressRight,
  rightIconSize = 24,
  backgroundColor = "#6200ea", // Màu nền header
}) => {
  
  const renderLeft = () => {
    return leftComponent || (
      <Pressable style={styles.leftIcon} onPress={onPressLeft}>
        <Icon name={iconLeft} size={leftIconSize} color={iconLeftColor} />
      </Pressable>
    );
  };

  const renderCenter = () => {
    return (
      <View style={styles.containerCenter}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
    );
  };

  const renderRight = () => {
    return rightComponent || (
      <Pressable style={styles.rightIcon} onPress={onPressRight}>
        <Icon name={iconRight} size={rightIconSize} color={iconRightColor} />
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {renderLeft()}
      {renderCenter()}
      {renderRight()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#6200ea",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    elevation: 4, // Đổ bóng cho header
  },
  leftIcon: {
    padding: 8,
  },
  rightIcon: {
    padding: 8,
  },
  containerCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Header;
