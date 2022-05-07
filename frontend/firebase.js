import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAMVaAr8mb2FZikB8hZIm3NIef23BHCGok",
  authDomain: "terraferma-665e5.firebaseapp.com",
  projectId: "terraferma-665e5",
  storageBucket: "terraferma-665e5.appspot.com",
  messagingSenderId: "222349347436",
  appId: "1:222349347436:web:43b26cbac96d1fd6f42649",
  measurementId: "G-Q57HSFZVB8"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
