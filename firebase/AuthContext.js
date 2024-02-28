// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './config'; // Make sure to replace './firebase' with the correct path to your Firebase configuration
import {  useRouter } from 'expo-router';
import { getDoc, getFirestore, doc } from 'firebase/firestore';
import { app } from '../firebase/config';


const AuthContext = createContext();
const router = useRouter();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [likedJobs, setLikedJobs] = useState("");
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      // Check if userAuth exists and is not null
      if (userAuth) {
        // If userAuth exists, set the user object to the state
        setUser(userAuth);
        getLikedJobs(userAuth)

      }
    });
  
    // Unsubscribe from the auth state listener when the component unmounts
    return () => unsubscribe();

  }, []);
  



  const signIn = async (email, password) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      setUser(userCredential.user);
      getLikedJobs(userCredential.user)

    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };




  const getLikedJobs = async (user) => {
    try {
      const userId = user.uid;
      console.log(userId);
      const firestore = getFirestore(app);
      const userDocRef = doc(firestore,'likedJobs', userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const likedJobsData = userDocSnap.data().likedJobs || [];
        setLikedJobs(likedJobsData.join(","));

      } else {
        console.log("not exsisted");
        console.log("No liked jobs found for this user.");
        setLikedJobs("");
 
      }
    } catch (error) { 
      console.error('Error fetching liked jobs:', error);
    } finally {
      setLoading(false);
    }
  };

 
  // const getUserProfile = async (user) => {
  //   try {
  //     const userId = user.uid;
  //     const firestore = getFirestore(app);
  //     const usersCollectionRef = collection(firestore, 'users');
  //     const querySnapshot = await getDocs(query(usersCollectionRef, where('uid', '==', userId)));
  
  //     if (!querySnapshot.empty) {
  //       // Assuming there's only one document with the matching UID
  //       const userDocSnap = querySnapshot.docs[0];
  //       const userData = userDocSnap.data();
  //       setUserProfile(userData);
  //       console.log(userData);
  //     } else {
  //       console.log("User profile not found.");
  //       setUserProfile(null);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user profile:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  


  const signOut = async () => {
    try {
      await auth.signOut();
      router.push(`/profile/login/Login`);
      setUser(null);
      
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut,likedJobs}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
