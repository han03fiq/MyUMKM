import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../utils/supabase'; // Import Supabase connection
import { AuthContext } from '../utils/AuthContext';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const TambahProduk = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(''); // State untuk menyimpan URL gambar
  const { session } = useContext(AuthContext); // Get session from AuthContext
  const navigation = useNavigation(); // Initialize navigation

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

      // Dapatkan id_store dari id_akun sesi saat ini
      const { data: storeData, error: storeError } = await supabase
        .from('Store')
        .select('id')
        .eq('id_akun', session.user.id);

      if (storeError) {
        throw storeError;
      }

      const idStore = storeData[0]?.id;

      if (!idStore) {
        throw new Error('Store not found for the current user');
      }

      const { data: productData, error: productError } = await supabase.from('Product').insert([
        {
          name_product: productName,
          description: description,
          price: price,
          id_store: idStore, // Gunakan id_store dari sesi saat ini
          id_kategori: categoryID, // Set id_kategori based on the category input
          gambar_product: image || null, // Simpan URL gambar dalam database atau null jika kosong
        },
      ]).select(); // Ensure to select the inserted data

      if (productError) {
        throw productError;
      }

      if (!productData || productData.length === 0) {
        throw new Error('Failed to retrieve inserted product data');
      }

      // Ambil id_product dari produk yang baru ditambahkan
      const idProduct = productData[0]?.id_product;

      if (!idProduct) {
        throw new Error('Failed to retrieve id_product from inserted data');
      }

      // Panggil fungsi untuk menyimpan data ke tabel MyProduct
      await saveToMyProduct(idProduct, idStore);

      Alert.alert('Success', 'Product added successfully!');
      // Reset input fields after successful save
      setProductName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setImage('');
      navigation.navigate('MyProduct', { newProduct: { id: idProduct, name: productName, description: description, price: price, image: image } }); // Navigate to MyProduct page after save
    } catch (error) {
      console.error('Error saving product:', error.message);
      Alert.alert('Error', `Failed to save product: ${error.message}`);
    }
  };

  const saveToMyProduct = async (idProduct, idStore) => {
    try {
      const { data, error } = await supabase.from('MyProduct').insert([
        {
          id_produk: idProduct, // FK dari id_product di tabel Product
          id_store: idStore,    // FK dari id di tabel Store
        },
      ]);

      if (error) {
        throw error;
      }

      console.log('MyProduct entry added successfully:', data);
    } catch (error) {
      console.error('Error saving to MyProduct:', error.message);
      Alert.alert('Error', 'Failed to save to MyProduct.');
    }
  };

  return (
    <SafeAreaView className="flex justify-center items-center px-[9px]">
      <View className="h-full w-full mx-5">
        <View>
          <Text className="text-[30px] font-bold text-center">Tambah Produk</Text>
        </View>
        <View className="mt-6 ">
          <Text className="text-xl font-bold mb-2">Basic Information</Text>
          <View>
            <TextInput
              value={productName}
              onChangeText={setProductName}
              className="w-full border border-[#606060] bg-white rounded-[15px] px-3 py-4 mb-2"
              placeholder="Masukkan nama produk"
            />
          </View>
          <View>
            <TextInput
              value={description}
              onChangeText={setDescription}
              className="w-full border border-[#606060] bg-white rounded-[15px] px-3 py-4 mb-2"
              placeholder="Masukkan deskripsi produk"
            />
          </View>
          <View>
            <TextInput
              value={price}
              onChangeText={setPrice}
              className="w-full border border-[#606060] bg-white rounded-[15px] px-3 py-4 mb-2"
              placeholder="Masukkan harga produk"
              keyboardType="numeric"
            />
          </View>
          <View className="mb-3">
            <TextInput
              value={category}
              onChangeText={setCategory}
              className="w-full border border-[#606060] bg-white rounded-[15px] px-3 py-4 mb-2"
              placeholder="Masukkan kategori produk"
            />
          </View>
        </View>
        <View className="mb-4">
          <Text className="text-xl font-bold mb-2">Product Image</Text>
          <View className="flex flex-row">
            <TextInput
              value={image}
              onChangeText={setImage}
              className="w-full border border-[#606060] bg-white rounded-[15px] px-3 py-4 mb-2"
              placeholder="Masukkan foto produk dalam URL" // Ganti placeholder menjadi "Image URL"
            />
          </View>
        </View>
        <View className="flex flex-row justify-between bottom-[20px] absolute">
          <TouchableOpacity onPress={saveProduct} className="flex-1 mr-2 p-3 bg-black rounded-[15px]">
            <Text className="text-white text-center">Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()} className="flex-1 ml-2 p-3 bg-gray-300 rounded-[15px]">
            <Text className="text-black text-center">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TambahProduk;
