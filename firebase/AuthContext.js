// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './config'; // Make sure to replace './firebase' with the correct path to your Firebase configuration
import {  useRouter } from 'expo-router';

const AuthContext = createContext();
const router = useRouter();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      setUser(userAuth);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

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
    <AuthContext.Provider value={{ user, signIn, signOut }}>
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
