import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../utils/AuthContext';
import { ScrollView } from 'react-native-gesture-handler';
import { supabase } from '../utils/supabase';
import { useFocusEffect } from '@react-navigation/native';

const ProductCard = ({ id, name, description, price, image, onDelete, navigation }) => (
  <View className="bg-white rounded-lg shadow-md py-3 px-4 mb-3 flex-row">
    <Image
      source={{ uri: image }}
      className="w-[110px] h-[90px] rounded-lg mr-4"
    />
    <View className="flex-1">
      <TouchableOpacity onPress={() => navigation.navigate('MyProductPage', { id, name, description, price, image })}>
        <Text className="text-xl font-bold mb-2">{name}</Text>
        <Text className="text-gray-600">{description}</Text>
        <Text className="text-gray-800 font-bold mt-2">{price}</Text>
      </TouchableOpacity>
      <TouchableOpacity className="absolute top-0 right-0 mt-1" onPress={() => onDelete(id)}>
        <Icon name="trash" size={18} color='rgba(255, 0, 0, 0.5)' />
      </TouchableOpacity>
    </View>
  </View>
);

const MyProduct = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const { isLoggedIn, session } = useContext(AuthContext); // Get isLoggedIn and session from AuthContext
  const [storeExists, setStoreExists] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkStore = async () => {
    try {
      if (isLoggedIn && session) {
        const user = session.user;
        console.log('User is logged in:', user);
        console.log('Checking store for user:', user.id);
        
        const { data: storeData, error } = await supabase
          .from('Store')
          .select('id')
          .eq('id_akun', user.id);
        
        if (error) {
          console.error('Error checking store:', error.message);
          throw error;
        }

        console.log('Store data:', storeData);
        setStoreExists(storeData.length > 0);
      } else {
        console.log('User is not logged in or user data is not available');
      }
    } catch (error) {
      console.error('Error checking store:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      checkStore();
    }, [isLoggedIn, session])
  );

  const addProduct = () => {
    const newProduct = {
      id: (products.length + 1).toString(),
      name: `Product ${products.length + 1}`,
      description: `Description of Product ${products.length + 1}`,
      price: `$${10 * (products.length + 1)}`,
      image: 'https://via.placeholder.com/150',
    };
    setProducts([...products, newProduct]);
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handleCreateStorePress = () => {
    navigation.navigate('TambahStore');
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 justify-center items-center px-[9px]">
      <View className="h-full w-full">
        <View>
          <Text className="text-[30px] font-bold text-center">My Product</Text>
        </View>
        <View className="items-center h-full mt-6">
          {isLoggedIn ? (
            storeExists ? (
              products.length > 0 ? (
                products.map(product => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                    onDelete={deleteProduct}
                    navigation={navigation}
                  />
                ))
              ) : (
                <View className='px-[9px] items-center justify-center flex-1'>
                  <View className='items-center'>
                    <Text className='mb-[20px] text-[20px] text-center'>
                      Belum ada produk, tambahkan produkmu sekarang!
                    </Text>
                  </View>
                </View>
              )
            ) : (
              <View className='px-[9px] items-center justify-center flex-1'>
                <View className='items-center'>
                  <Text className='mb-[20px] text-[20px] text-center'>
                    Kamu belum memiliki store, tekan tombol di bawah untuk membuat store!
                  </Text>
                  <TouchableOpacity 
                    className="bg-[#222] rounded-[15px] py-3 px-9 items-center"
                    onPress={handleCreateStorePress} 
                  >
                    <Text className="text-white text-lg">Buat Toko</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          ) : (
            <View className='px-[9px] items-center justify-center flex-1'>
              <View className='items-center'>
                <Text className='mb-[20px] text-[20px] text-center'>
                  Kamu belum Login, tekan tombol di bawah untuk Login!
                </Text>
                <TouchableOpacity 
                  className="bg-[#222] rounded-[15px] py-3 px-9 items-center"
                  onPress={handleLoginPress} 
                >
                  <Text className="text-white text-lg">Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
      {isLoggedIn && storeExists && (
        <TouchableOpacity className="absolute bottom-5 right-5 bg-[#222] w-[60px] h-[60px] rounded-full justify-center items-center shadow-lg" onPress={() => {navigation.navigate('TambahProduk')}}>
          <Icon name="add" size={30} color="white" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default MyProduct;