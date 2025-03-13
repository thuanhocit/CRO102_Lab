import React from "react";
import { View } from "react-native";
import Header from "./Lab11/Header";

const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {/* Header 1 - Trang chủ */}
      <Header 
        title="Trang chủ" 
        onPressLeft={() => alert("Back Pressed")} 
        onPressRight={() => alert("Profile Clicked")} 
      />

      {/* Header 2 - Cài đặt */}
      <Header 
        title="Cài đặt" 
        iconLeft="menu" 
        iconRight="settings" 
        onPressLeft={() => alert("Menu Opened")} 
        onPressRight={() => alert("Settings Opened")}
        backgroundColor="#ff5722" // Tùy chỉnh màu nền
      />

      {/* Header 3 - Thông báo */}
      <Header 
        title="Thông báo"
        iconLeft="arrow-back" 
        iconRight="notifications"
        onPressLeft={() => alert("Back to previous screen")}
        onPressRight={() => alert("View Notifications")}
        backgroundColor="#2196F3" // Màu xanh dương
      />
    </View>
  );
};

export default App;
