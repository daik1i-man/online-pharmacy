import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAFkBAM8un-f7GpmvR1yUNLRjKoUfL7Z5w",
  authDomain: "online-pharmacy-d1b60.firebaseapp.com",
  projectId: "online-pharmacy-d1b60",
  storageBucket: "online-pharmacy-d1b60.appspot.com",
  messagingSenderId: "660634193002",
  appId: "1:660634193002:web:c5bb886b6985a0f6f90e13"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export {storage}