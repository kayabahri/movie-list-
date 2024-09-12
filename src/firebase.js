import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwLmeRlrKhgX4xAy0YSh9rttdnSgryy1A",
  authDomain: "movie-list-a91f4.firebaseapp.com",
  projectId: "movie-list-a91f4",
  storageBucket: "movie-list-a91f4.appspot.com",
  messagingSenderId: "150029668364",
  appId: "1:150029668364:web:c306f6d8fcbe08edf9de29"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
