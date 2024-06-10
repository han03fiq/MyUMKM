import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking, Share, Image } from 'react-native';
import { MaterialCommunityIcons, Entypo, Feather, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../utils/supabase'; // Import supabase

const ProductPage = ({ navigation, route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [store, setStore] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data: productData, error } = await supabase
          .from('Product')
          .select('name_product, price, description, gambar_product, id_store')
          .eq('id_product', productId)
          .single();

        if (error) {
          throw error;
        } else {
          setProduct(productData);
          // Fetch store data using id_store
          const { data: storeData, error: storeError } = await supabase
            .from('Store')
            .select('name_store, location_store, profile_store')
            .eq('id', productData.id_store)
            .single();
          if (storeError) {
            throw storeError;
          } else {
            setStore(storeData);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error.message);
      }
    };

    fetchProduct();
  }, [productId]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this awesome product: ${product.name_product} - Rp ${product.price}. ${isExpanded ? product.description : `${product.description.slice(0, 50)}...`}`,
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

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 9 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 5, paddingHorizontal: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 2 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={{ marginRight: 6 }} onPress={handleShare}>
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
      <ScrollView style={{ flex: 1 }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          {product ? (
            product.gambar_product ? (
              <Image source={{ uri: product.gambar_product }} style={{ width: 300, height: 200, backgroundColor: '#ccc', marginTop: 6 }} />
            ) : (
              <View style={{ width: '100%', height: 200, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="image-outline" size={50} color="black" />
                <Text>No Image</Text>
              </View>
            )
          ) : null}
        </View>
        <View style={{ marginTop: 6, borderRadius: 10 }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{product ? product.name_product : 'Loading...'}</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 2 }}>{product ? `Rp ${product.price}` : 'Loading...'}</Text>
          <Text style={{ fontSize: 16, marginTop: 20 }}>
            {product ? (isExpanded ? product.description : `${product.description.slice(0, 50)}...`) : 'Loading...'}
          </Text>
          <TouchableOpacity onPress={toggleExpand}>
            <Text style={{ fontSize: 16, color: '#007bff', textDecorationLine: 'underline', marginTop: 2 }}>
              {isExpanded ? 'Read Less' : 'Read More...'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30, padding: 10, borderRadius: 15, width: 340, alignSelf: 'center', borderWidth: 1, borderColor: '#ccc', backgroundColor: '#e8e8e8' }}>
          {store && (
            <>
              <Image source={{ uri: store.profile_store }} style={{ width: 50, height: 50, marginRight: 10, borderRadius: 10 }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{store.name_store}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                  <MaterialCommunityIcons name="map-marker" size={16} color="gray" />
                  <Text style={{ fontSize: 13, color: 'gray' }}>{store.location_store}</Text>
                </View>
              </View>
            </>
          )}
          <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductPage;
