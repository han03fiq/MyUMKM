import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking, Share, Alert, Image } from 'react-native';
import { MaterialCommunityIcons, Entypo, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../utils/supabase';

const MyProductPage = ({ navigation, route }) => {
  const [product, setProduct] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const productId = route.params?.id;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('Product')
          .select('name_product, price, description, gambar_product')
          .eq('id_product', productId)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error.message);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this awesome product: ${product.name_product} - Rp ${product.price}. Handcrafted in Bandung, West Java, Indonesia.`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleHighlightProduct = async () => {
    try {
      console.log(`Highlighting product with ID: ${productId}`);
      const { data, error } = await supabase
        .from('Product')
        .update({ status: 1 })
        .eq('id_product', productId);

      if (error) {
        throw error;
      }

      console.log('Update result:', data);
      Alert.alert('Product Highlighted', 'Produk ini berhasil di Highlight');
    } catch (error) {
      console.error('Error highlighting product:', error.message);
      Alert.alert('Error', 'Failed to highlight product. Please try again later.');
    }
  };

  if (!product) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row justify-between items-center pb-5 px-4 shadow-md z-10">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-6" onPress={handleShare}>
            <Feather name="share-2" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleBookmark}>
            <MaterialCommunityIcons
              name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView className="flex-1">
        <View className="items-center justify-center relative">
          {product.gambar_product ? (
            <Image source={{ uri: product.gambar_product }} className="w-full h-72 bg-gray-300" />
          ) : (
            <View className="w-full h-72 bg-gray-300 justify-center items-center">
              <Feather name="image" size={50} color="black" />
              <Text>No Image</Text>
            </View>
          )}
        </View>
        <View className="mt-2 p-5 rounded-lg">
          <Text className="text-xl font-bold">{product.name_product}</Text>
          <Text className="text-lg font-semibold mt-2">Rp {product.price}</Text>
          <Text className="text-base mt-2">
            {isExpanded ? product.description : `${product.description.slice(0, 100)}...`}
          </Text>
          <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
            <Text className={`text-base text-blue-500 mt-1 underline ${isExpanded ? 'mt-5' : ''}`}>
              {isExpanded ? 'Read Less' : 'Read More...'}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mt-5 mb-10 items-center">
          <TouchableOpacity 
            className="bg-[#222] py-3 px-10 rounded-full"
            onPress={handleHighlightProduct}
          >
            <Text className="text-white text-lg font-semibold">Highlight This Product</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProductPage;