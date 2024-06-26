import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../utils/AuthContext';
import { ScrollView } from 'react-native-gesture-handler';
import { supabase } from '../utils/supabase';
import { useFocusEffect } from '@react-navigation/native';

const ProductCard = ({ id, name, description, price, image, status, onDelete, navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('MyProductPage', { id, name, description, price, image })}>
      <View className="bg-white rounded-lg shadow-md py-3 pl-4 pr-8 mb-3 flex-row w-[372px]">
        {image ? (
          <Image
            source={{ uri: image }}
            className="w-[110px] h-[110px] rounded-lg mr-4"
          />
        ) : (
          <View className="w-[110px] h-[110px] rounded-lg mr-4 bg-[#f0f0f0] border-[#d9d9d9] border justify-center items-center">
            <Icon name="image-outline" size={50} color="#222" />
            <Text>No Image</Text>
          </View>
        )}
        <View className="flex-1">
          
            <Text numberOfLines={2} ellipsizeMode="tail" style={{ width: 200 }} className="text-xl font-bold mb-2">{name}</Text>
            <Text numberOfLines={1} ellipsizeMode="tail" style={{ width: 200 }} className="text-gray-600">{description}</Text>
            <Text numberOfLines={1} ellipsizeMode="tail" style={{ width: 200 }} className="text-gray-800 font-bold mt-2">Rp. {price}</Text>
          
        </View>
        <TouchableOpacity className="absolute top-0 right-0 mt-3 mr-3" onPress={() => onDelete(id)}>
          <Icon name="trash" size={18} color='rgba(255, 0, 0, 0.5)' />
        </TouchableOpacity>
        {status === '1' && (
          <View className="absolute bottom-0 right-0 mb-3 mr-3">
            <Icon name="flash" size={18} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
};

const MyProduct = ({ navigation, route }) => {
  const [products, setProducts] = useState([]);
  const { isLoggedIn, session } = useContext(AuthContext);
  const [storeExists, setStoreExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const newProduct = route.params?.newProduct;

  const checkStore = async () => {
    try {
      if (isLoggedIn && session) {
        const user = session.user;
        const { data: storeData, error } = await supabase
          .from('Store')
          .select('id')
          .eq('id_akun', user.id);
        
        if (error) {
          console.error('Error checking store:', error.message);
          throw error;
        }

        setStoreExists(storeData.length > 0);
        
        if (storeData.length > 0) {
          const storeId = storeData[0].id;
          fetchProducts(storeId);
        }
      } else {
        console.log('User is not logged in or user data is not available');
      }
    } catch (error) {
      console.error('Error checking store:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async (storeId) => {
    try {
      const { data: productData, error } = await supabase
        .from('MyProduct')
        .select(`
          id,
          id_produk,
          Product (
            id_product,
            name_product,
            description,
            price,
            gambar_product,
            status
          )
        `)
        .eq('id_store', storeId);

      if (error) {
        throw error;
      }

      const formattedProducts = productData.map((product) => ({
        id: product.id_produk,
        name: product.Product.name_product,
        description: product.Product.description,
        price: product.Product.price,
        image: product.Product.gambar_product,
        status: product.Product.status,
      }));

      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  useEffect(() => {
    checkStore();
  }, [isLoggedIn, session]);

  useEffect(() => {
    if (newProduct) {
      setProducts(prevProducts => [...prevProducts, newProduct]);
    }
  }, [newProduct]);

  const deleteProduct = async (productId) => {
    try {
      const { error } = await supabase
        .from('Product')
        .delete()
        .eq('id_product', productId);

      if (error) {
        throw error;
      }

      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error.message);
      Alert.alert('Error', `Failed to delete product: ${error.message}`);
    }
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
        <View className="items-center h-full w-full mt-6">
          {isLoggedIn ? (
            storeExists ? (
              products.length > 0 ? (
                <ScrollView>
                  {products.map(product => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      description={product.description}
                      price={product.price}
                      image={product.image}
                      status={product.status}
                      onDelete={(productId) => deleteProduct(productId)}
                      navigation={navigation}
                    />
                  ))}
                </ScrollView>
              ) : (
                <View className='px-[9px] items-center justify-center flex-1 mt-[-50px]'>
                  <View className='items-center'>
                    <Text className='mb-[20px] text-[20px] text-center'>
                      Belum ada produk, tambahkan produkmu sekarang!
                    </Text>
                  </View>
                </View>
              )
            ) : (
              <View className='px-[9px] items-center justify-center flex-1 mt-[-50px]'>
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
            <View className='px-[9px] items-center justify-center flex-1 mt-[-50px]'>
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