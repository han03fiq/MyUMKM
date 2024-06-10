import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../utils/supabase';
import { Ionicons } from '@expo/vector-icons';

const Store = ({ navigation }) => {
  const [storesByCategory, setStoresByCategory] = useState({});

  useEffect(() => {
    const fetchStoresByCategory = async () => {
      try {
        const { data: storesData, error: storesError } = await supabase.from('Store').select('*');
        if (storesError) throw storesError;

        // Group stores by category
        const groupedStores = {};
        storesData.forEach(store => {
          if (!groupedStores[store.id_kategori]) {
            groupedStores[store.id_kategori] = [];
          }
          groupedStores[store.id_kategori].push(store);
        });

        setStoresByCategory(groupedStores);
      } catch (error) {
        console.error('Error fetching stores by category:', error.message);
      }
    };

    fetchStoresByCategory();
  }, []);

  const handleStorePress = (store) => {
    console.log('Store pressed:', store);
    navigation.navigate('StoreUnit', { store });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.title}>Store</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 6 }}>
          {Object.entries(storesByCategory).map(([categoryId, categoryStores]) => (
            <View key={categoryId}>
              <View style={styles.header}>
                <Text style={[styles.subtitle, { textAlign: 'left' }]}>
                  {getCategoryName(categoryId)}
                </Text>
                <View style={styles.line} />
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'row' }}>
                  {categoryStores.map((store) => (
                    <TouchableOpacity 
                      key={store.id} 
                      style={styles.storeContainer} 
                      onPress={() => handleStorePress(store)}
                    >
                      {store.profile_store ? (
                        <Image source={{ uri: store.profile_store }} style={styles.image} />
                      ) : (
                        <View style={styles.noImageContainer}>
                          <Ionicons name="image-outline" size={24} color="black" />
                          <Text style={styles.noImageText}>No Image</Text>
                        </View>
                      )}
                      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.storeName}>{store.name_store}</Text>
                      <Text style={styles.storeLocation}>{store.location_store}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const getCategoryName = (categoryId) => {
  switch (categoryId) {
    case '1':
      return 'Fashion';
    case '2':
      return 'Home and Kitchen';
    case '3':
      return 'Handicraft';
    case '4':
      return 'Gadget';
    case '5':
      return 'Food & Beverages';
    case '6':
      return 'Beauty';
    default:
      return '';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header: {
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 8,
  },
  storeContainer: {
    margin: 5,
    alignItems: 'center',
    width: 100,
    height: 150,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  storeName: {
    textAlign: 'center',
    marginTop: 5,
  },
  storeLocation: {
    textAlign: 'center',
    color: 'gray',
  },
  noImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#d9d9d9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    marginTop: 5,
    fontSize: 12,
    color: 'black',
  },
});

export default Store;