import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../utils/supabase'; // Import Supabase connection
import { AuthContext } from '../utils/AuthContext';

const TambahProduk = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const { session } = useContext(AuthContext); // Get session from AuthContext

  const getCategoryID = (categoryName) => {
    switch (categoryName) {
      case 'Fashion':
        return 1;
      case 'Home and Kitchen':
        return 2;
      case 'Handicraft':
        return 3;
      case 'Gadget':
        return 4;
      case 'Food and Beverages':
        return 5;
      case 'Beauty':
        return 6;
      default:
        return null;
    }
  };

  const saveProduct = async () => {
    try {
      const categoryID = getCategoryID(category);

      if (!categoryID) {
        throw new Error('Invalid category');
      }

      const { data, error } = await supabase.from('Product').insert([
        {
          name_product: productName,
          description: description,
          price: price,
          id_akun: session.user.id, // Set id_akun to the user's ID from the session
          id_kategori: categoryID, // Set id_kategori based on the category input
        },
      ]);

      if (error) {
        throw error;
      }

      Alert.alert('Success', 'Product added successfully!');
      // Reset input fields after successful save
      setProductName('');
      setDescription('');
      setPrice('');
      setCategory('');
    } catch (error) {
      console.error('Error saving product:', error.message);
      Alert.alert('Error', 'Failed to save product.');
    }
  };

  return (
    <SafeAreaView className="flex justify-center items-center px-[9px]">
      <View className="h-full w-full mx-5">
        <View>
          <Text className="text-[30px] font-bold text-center">Tambah Produk</Text>
        </View>
        <View className="mt-6 ">
          <Text className="text-xl font-bold mb-1">Basic Information</Text>
          <View className="mb-3">
            <TextInput
              value={productName}
              onChangeText={setProductName}
              className="border border-gray-300 p-2 rounded-md"
              placeholder="Product Name"
            />
          </View>
          <View className="mb-3">
            <TextInput
              value={description}
              onChangeText={setDescription}
              className="border border-gray-300 p-2 rounded-md"
              placeholder="Description"
            />
          </View>
          <View className="mb-3">
            <TextInput
              value={price}
              onChangeText={setPrice}
              className="border border-gray-300 p-2 rounded-md"
              placeholder="Price"
              keyboardType="numeric"
            />
          </View>
          <View className="mb-3">
            <TextInput
              value={category}
              onChangeText={setCategory}
              className="border border-gray-300 p-2 rounded-md"
              placeholder="Category"
            />
          </View>
        </View>
        <View className="mb-4">
          <Text className="text-xl font-bold mb-1">Product Image</Text>
          <View className="flex flex-row">
            <View className="w-24 h-24 bg-gray-200 border border-gray-300 mr-2 rounded-md"></View>
            <View className="w-24 h-24 bg-gray-200 border border-gray-300 mr-2 rounded-md"></View>
            <TouchableOpacity className="w-24 h-24 bg-gray-200 border border-gray-300 rounded-md flex items-center justify-center">
              <Text className="text-gray-500">Add Image</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-row justify-between">
          <TouchableOpacity onPress={saveProduct} className="flex-1 mr-2 p-3 bg-black rounded-md">
            <Text className="text-white text-center">Save</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 ml-2 p-3 bg-gray-300 rounded-md">
            <Text className="text-black text-center">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TambahProduk;