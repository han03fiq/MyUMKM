import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from React Navigation
import { supabase } from '../utils/supabase'; // Import Supabase connection
import { AuthContext } from '../utils/AuthContext'; // Import AuthContext

const TambahStore = () => {
  const [storeName, setStoreName] = useState('');
  const [storeCategory, setStoreCategory] = useState('');
  const [storeLocation, setStoreLocation] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storeImage, setStoreImage] = useState('');
  const { session } = useContext(AuthContext); // Get session from AuthContext
  const navigation = useNavigation(); // Initialize navigation

  const categoryMapping = {
    'Fashion': 1,
    'Home and Kitchen': 2,
    'Handicraft': 3,
    'Gadget': 4,
    'Food & Beverages': 5,
    'Beauty': 6,
  };

  const addStore = async () => {
    const categoryId = categoryMapping[storeCategory] || null;

    try {
      const { error } = await supabase.from('Store').insert([
        {
          name_store: storeName || null,
          id_kategori: categoryId,
          location_store: storeLocation || null,
          directions_store: storeAddress || null,
          profile_store: storeImage || null,
          id_akun: session.user.id,
        },
      ]);

      if (error) {
        throw error;
      }

      Alert.alert('Success', 'Store added successfully!');
      // Reset input fields after successful save
      setStoreName('');
      setStoreCategory('');
      setStoreLocation('');
      setStoreAddress('');
      setStoreImage('');

      // Navigate back to ProfileAfterLogin
      navigation.goBack();
    } catch (error) {
      console.error('Error adding store:', error.message);
      Alert.alert('Error', 'Failed to add store.');
    }
  };

  return (
    <SafeAreaView className="flex justify-center items-center px-[9px]">
      <View className="h-full w-full">
        <View>
          <Text className="text-[30px] font-bold text-center">My Store</Text>
        </View>
        <View className='items-center justify-center flex-1'>
          <TextInput
            className="w-full border border-[#606060] bg-white rounded-[15px] px-4 py-5 mb-4"
            placeholder="Masukkan nama store"
            value={storeName}
            onChangeText={setStoreName}
            autoCapitalize="none"
          />
          <TextInput
            className="w-full border border-[#606060] bg-white rounded-[15px] px-4 py-5 mb-4"
            placeholder="Masukkan kategori store"
            value={storeCategory}
            onChangeText={setStoreCategory}
            autoCapitalize="none"
          />
          <TextInput
            className="w-full border border-[#606060] bg-white rounded-[15px] px-4 py-5 mb-4"
            placeholder="Masukkan lokasi store"
            value={storeLocation}
            onChangeText={setStoreLocation}
            autoCapitalize="none"
          />
          <TextInput
            className="w-full border border-[#606060] bg-white rounded-[15px] px-4 py-5 mb-4"
            placeholder="Masukkan alamat store"
            value={storeAddress}
            onChangeText={setStoreAddress}
            autoCapitalize="none"
          />
          <TextInput
            className="w-full border border-[#606060] bg-white rounded-[15px] px-4 py-5 mb-4"
            placeholder="Masukkan gambar store"
            value={storeImage}
            onChangeText={setStoreImage}
            autoCapitalize="none"
          />
          <TouchableOpacity 
            className="bg-[#222] rounded-[15px] py-3 px-9 items-center"
            onPress={addStore}
          >
            <Text className="text-white text-lg">Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TambahStore;
