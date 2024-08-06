import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARdqLFZyVPvNHV0hR4CgkmUBJHbFTAGEw",
  authDomain: "socail-app-a9418.firebaseapp.com",
  projectId: "socail-app-a9418",
  storageBucket: "socail-app-a9418.appspot.com",
  messagingSenderId: "323783550369",
  appId: "1:323783550369:web:b8cdf00781365e9f6397e0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// const Addproducts = async () => {
//   try {
//     const docRef = await addDoc(collection(db, "Products"), {
//       name: "Tokyo",
//       brand: "Japan",
//       category: "Phones",
//       price: Number,
//       description:"moble samsung"

//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// };

// export default Addproducts;
