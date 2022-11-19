import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const app = initializeApp( {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: "mind-my-own-buiz-images.firebaseapp.com",
  projectId: "mind-my-own-buiz-images",
  storageBucket: "mind-my-own-buiz-images.appspot.com",
  messagingSenderId: "441578892562",
  appId: `${process.env.REACT_APP_ID}`,
});

// Initialize Firebase
const storage = getStorage(app);
export default storage;
