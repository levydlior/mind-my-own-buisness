import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDPhIWtTKrvJGMyK_68TpTf6WhGjhcK8UE",
  authDomain: "mind-my-own-buiz-images.firebaseapp.com",
  projectId: "mind-my-own-buiz-images",
  storageBucket: "mind-my-own-buiz-images.appspot.com",
  messagingSenderId: "441578892562",
  appId: "1:441578892562:web:9fc1d9aec2a4d4c0a3d7cb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)