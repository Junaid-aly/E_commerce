
import { useEffect, useState } from 'react';
import { updateProfile } from "firebase/auth";
import { collection, addDoc, getDocs,getDoc, doc, updateDoc } from 'firebase/firestore';
import { db, storage,auth} from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import { useAuth } from '../Context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';




export const Addproducts = () => {
const [authData] = useAuth();
const navigate = useNavigate()
const [title, setTitle] = useState('');
const [brand, setBrand] = useState('');
const [category, setCategory] = useState('');
const [price, setPrice] = useState('');
const [description, setDescription] = useState('');
const [photo, setPhoto] = useState(null);
const [error, setError] = useState(null);

const handleFileChange = (file) => {
  setPhoto(file);
};

const addPost = async () => {
  try {
    let photoURL = '';
    if (photo) {
      const storageRef = ref(storage, `posts/${photo.name}`);
      await uploadBytes(storageRef, photo);
      photoURL = await getDownloadURL(storageRef);
    }

    const newPost = {
      title,
      brand,
      price,
      category,
      description,
      photoURL,
      createdAt: new Date().toLocaleString(), 
      userName: authData.displayName,
      userEmail: authData.email
    };

    console.log(newPost, "newPost");
    toast.success('Successfully Added Post')
    navigate("/")
    const docRef = await addDoc(collection(db, 'Products'), newPost);
    return docRef.id;
  } catch (error) {
    console.error("Error adding post:", error);
    setError(error);
  }
};

return {
    title,
    setTitle,
    brand,
    setBrand,
    category,
    setCategory,
    price,
  setPrice,
  description,
  setDescription,
  photo,
  setPhoto,
  addPost,
  handleFileChange,
  error
};
};


export const getProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Products"));
      const data = []
      querySnapshot.forEach((doc) => {
        data.push({
            id: doc.id,
            ...doc.data()
        })
      })
      return data
    } catch (error) {
      console.error("Error fetching products: ", error);
      return []
    }
  };

  