// AuthProvider.js
import React, { createContext, useEffect, useState } from 'react';
import { supabase } from './supabase';
import { signInWithEmail, signUpWithEmail, signOut, fetchUser } from './api'; // Import fetchUser function

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [username, setUsername] = useState(null);

  // Derive isLoggedIn state from session
  const isLoggedIn = session !== null;

  useEffect(() => {
    const getSession = async () => {
      const userSession = supabase.auth.session();
      setSession(userSession);
      if (userSession) {
        const userData = await fetchUser(userSession);
        setUsername(userData.username);
      }
    };

    getSession();

    const sessionListener = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchUser(session).then(userData => {
          setUsername(userData.username);
        }).catch(error => {
          console.error('Error fetching user data:', error.message);
        });
      }
    });

    return () => {
      sessionListener.unsubscribe();
    };
  }, []);

  // Define function to handle sign-out
  const handleSignOut = async () => {
    try {
      await signOut(); // Call the signOut function from api.js
    } catch (error) {
      console.error('Error during sign out:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ session, username, isLoggedIn, signInWithEmail, signUpWithEmail, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
