import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDaDpkUpMENtl0GfOcLf3HGayriWW-uGHU",
  authDomain: "asmcro102-6714b.firebaseapp.com",
  projectId: "asmcro102-6714b",
  storageBucket: "asmcro102-6714b.firebasestorage.app",
  messagingSenderId: "1098719307293",
  appId: "1:1098719307293:web:906c011a0869dcd15248f4",
  measurementId: "G-5T6K508YM1"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Xác thực Firebase với tính bền vững của AsyncStorage
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  console.log("Auth already initialized or error:", error);
  auth = getAuth(app);
}

// Khởi tạo Cloud Firestore
const db = getFirestore(app);

// Kiểm tra kết nối Firestore
console.log("🔥 Firestore initialized:", db ? "Success" : "Failed");

export { app, auth, db };
