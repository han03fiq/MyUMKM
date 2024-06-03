import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../utils/supabase';
import { AuthContext } from '../utils/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const { session, signOut } = useContext(AuthContext); // Import signOut from AuthContext

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('Account')
          .select('username')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching user profile:', error.message);
          Alert.alert('Error', 'Failed to fetch user profile.');
        } else {
          setUsername(data.username);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        Alert.alert('Error', 'Failed to fetch user profile.');
      }
    };

    if (session && session.user && session.user.id) {
      fetchUserProfile();
    } else {
      console.log('Session or user ID is not available');
    }
  }, [session]);

  const handleLogout = async () => {
    try {
      await signOut(); // Call the signOut function from AuthContext
      // Navigate to login screen or do any other necessary actions after logout
    } catch (error) {
      console.error('Error during logout:', error.message);
      Alert.alert('Logout Failed', error.message);
    }
  };

  const handleAddStore = () => {
    // Navigating to the screen where you can add a new store
    navigation.navigate('AddStore');
  };

  return (
    <SafeAreaView className="flex justify-center items-center px-[9px]">
      <View className="h-full w-full items-center">
        <View>
          <Text className="text-[30px] font-bold text-center">Profile</Text>
        </View>
        <View className="mt-5 mb-2">
          <MaterialCommunityIcons name="account" size={100} color="#ccc" />
        </View>
        <Text className="text-lg font-bold">{username}</Text>
        <TouchableOpacity
          className="bg-[#222] rounded-[15px] py-3 px-9 items-center mt-4"
          onPress={handleAddStore}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>Tambah Store</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#222] rounded-[15px] py-3 px-9 items-center mt-96"
          onPress={handleLogout}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
