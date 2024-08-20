import { createUserWithEmailAndPassword, onAuthStateChanged,signInWithEmailAndPassword, updateProfile ,signOut} from 'firebase/auth';
import { auth  } from '../../config/firebase';
 


import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';



export const use_Auth = () => {
  
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    const { displayName, email, password } = data;
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      if (displayName) {
        await updateProfile(user, { displayName });
      }
      toast.success("Successfully registered")
      console.log('User registered:', user);
      
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error('Error registering user:', errorCode, errorMessage);
    }
  };
  
  const onLogin = async (data) => {
    try {
      
      await signInWithEmailAndPassword(auth, data.email, data.password);
      
      
      onAuthStateChanged(auth, (user) => {
        if (user) {
          toast.success("User successfully  login");
          navigate('/'); 
        } else {
          // User is signed out
          console.log("User is signed out");
          
        }
      });
    } catch (error) {
      
      toast.error("Login failed", error);
      toast.promise("Login failed: " + error.message);
    }
  };
  
  const onLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      navigate('/login'); // Redirect to login page or another page after logout
    } catch (error) {
      console.error('Logout failed', error);
      toast.error('Logout failed: ' + error.message);
    }
  };
  
  
  const UpdateUserProfile = async (data) => {
    const user = auth.currentUser;
    
    if (user) {
      try {
        await updateProfile(user, {
          displayName: data.displayName || user.displayName,
          photoURL: data.photoURL || user.photoURL
        });
        toast.success('Profile updated successfully!');
      } catch (error) {
        toast.promise('Error updating profile:', error);
      }
    } else {
      toast.error('No user is signed in.');
    }
  };
  
  







  return {onSubmit ,onLogin ,onLogout ,UpdateUserProfile }
  
}


