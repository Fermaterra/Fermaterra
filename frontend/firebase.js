import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: "terraferma-665e5",
  storageBucket: "terraferma-665e5.appspot.com",
  messagingSenderId: "222349347436",
  appId: process.env.APPID,
  measurementId: "G-Q57HSFZVB8"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
