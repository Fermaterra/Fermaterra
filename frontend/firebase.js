import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: "fermaterra-1fd31",
  storageBucket: "fermaterra-1fd31.appspot.com",
  messagingSenderId: "462074134912",
  appId: process.env.APPID,
  measurementId: "G-GBYJNH0Z0C"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
