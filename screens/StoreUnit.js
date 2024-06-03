import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Entypo, Feather } from '@expo/vector-icons';
import { supabase } from '../utils/supabase';

const StoreUnit = ({ navigation, route }) => {
  const { store } = route.params;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: productsData, error } = await supabase
          .from('Product')
          .select('id_product, name_product, price, gambar_product')
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
        <Image source={{ uri: store.profile_store }} style={styles.logo} />
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
      <ScrollView showsVerticalScrollIndicator='false' contentContainerStyle={styles.productGrid}>
        {products.map((product) => (
          <View key={product.id_product} style={styles.productCard}>
            <Image source={{ uri: product.gambar_product}} style={styles.productImagePlaceholder} />
            <Text style={styles.productName}>{product.name_product}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 9,
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
    width: '100%',
    height: 100,
    backgroundColor: '#ccc',
    marginBottom: 10,
    borderRadius: 10,
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
