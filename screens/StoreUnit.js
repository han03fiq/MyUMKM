import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Entypo, Feather, Ionicons } from '@expo/vector-icons'; // Import Ionicons
import { supabase } from '../utils/supabase';

const StoreUnit = ({ navigation, route }) => {
  const { store } = route.params;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: productsData, error } = await supabase
          .from('Product')
          .select('id_product, name_product, price, gambar_product, status')
          .eq('id_store', store.id);

        if (error) {
          throw error;
        } else {
          setProducts(productsData);
        }
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();

    console.log('Store ID:', store.id);
  }, [store.id]);

  const handleShare = async () => {
    // implement share functionality
  };

  const handleGetDirections = () => {
    if (store.directions_store) {
      Linking.openURL(store.directions_store);
    } else {
      alert('Toko belum memasukkan lokasi detail');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon} onPress={handleShare}>
            <Feather name="share-2" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.storeInfo}>
        {store.profile_store ? (
          <Image source={{ uri: store.profile_store }} style={styles.logo} />
        ) : (
          <View style={styles.noLogo}>
            <Ionicons name="image-outline" size={30} color="black" />
          </View>
        )}
        <View>
          <Text style={styles.storeName}>{store.name_store}</Text>
          <View style={styles.locationContainer}>
            <MaterialCommunityIcons name="map-marker" size={16} color="gray" />
            <Text style={styles.locationText}>{store.location_store}</Text>
          </View>
          <TouchableOpacity onPress={handleGetDirections}>
            <Text style={styles.directionsText}>Get Directions</Text>
          </TouchableOpacity>
        </View>
      </View>
      {products.length === 0 ? ( // Tampilkan pesan jika tidak ada produk yang dijual
        <Text style={styles.noProductText}>Toko ini belum memiliki produk yang dijual</Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator='false' contentContainerStyle={styles.productGrid}>
          {products.map((product) => (
            <View key={product.id_product} style={styles.productCard}>
              {product.gambar_product ? (
                <Image source={{ uri: product.gambar_product}} style={styles.productImagePlaceholder} />
              ) : (
                <View style={styles.productImagePlaceholder}>
                  <Ionicons name="image-outline" size={50} color="black" />
                  <Text style={styles.noImageText}>No Image</Text>
                </View>
              )}
              <Text style={styles.productName}>{product.name_product}</Text>
              <Text style={styles.productPrice}>Rp. {product.price}</Text>
              {product.status === '1' && (
                <View className="absolute bottom-0 right-0 mb-3 mr-3">
                  <Ionicons name="flash" size={18} />
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 9,
  },
  noProductText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 20,
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  noLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  locationText: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 5,
  },
  directionsText: {
    fontSize: 14,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    width: 370,
  },
  productCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productImagePlaceholder: {
    width: 137,
    height: 100,
    backgroundColor: '#d9d9d9',
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: 'gray',
  },
});

export default StoreUnit;
