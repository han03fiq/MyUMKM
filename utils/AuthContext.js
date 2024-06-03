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
      console.log('Current session:', userSession);
      setSession(userSession);
      if (userSession) {
        try {
          const { user } = userSession;
          const userData = await fetchUser(user.id); // Fetch user data using user ID
          console.log('Fetched user data:', userData);
          setUsername(userData.username);
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
      }
    };

    getSession();

    const { data: sessionListener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', session);
      setSession(session);
      if (session) {
        const { user } = session;
        fetchUser(user.id).then(userData => {
          console.log('Fetched user data after auth state change:', userData);
          setUsername(userData.username);
        }).catch(error => {
          console.error('Error fetching user data:', error.message);
        });
      } else {
        setUsername(null); // Clear username if there's no session
      }
    });

    return () => {
      sessionListener?.unsubscribe();
    };
  }, []);

  // Define function to handle sign-out
  const handleSignOut = async () => {
    try {
      await signOut(); // Call the signOut function from api.js
      setSession(null); // Clear session on sign out
      setUsername(null); // Clear username on sign out
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