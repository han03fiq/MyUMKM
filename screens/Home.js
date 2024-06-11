import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBar from '../components/SearchBar';
import { supabase } from '../utils/supabase';

const categories = [
  { id: 1, name: 'Fashion', icon: 'hanger' },
  { id: 2, name: 'Home and Kitchen', icon: 'countertop' },
  { id: 3, name: 'Handicraft', icon: 'hand-heart' },
  { id: 4, name: 'Gadget', icon: 'monitor-cellphone' },
  { id: 5, name: 'Food and Beverages', icon: 'food' },
  { id: 6, name: 'Beauty', icon: 'creation' },
];

const Home = ({ navigation }) => {
  const [stores, setStores] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const { data: storesData, error: storesError } = await supabase.from('Store').select('*');
        if (storesError) throw storesError;
        setStores(storesData);
      } catch (error) {
        console.error('Error fetching stores:', error.message);
      }
    };

    const fetchRecommendedProducts = async () => {
      try {
        const { data: productsData, error: productsError } = await supabase
          .from('Product')
          .select(`
            id_product, 
            name_product, 
            price, 
            gambar_product,
            status,
            Store (id, location_store)
          `);
        if (productsError) throw productsError;

        const formattedProducts = productsData.map(product => ({
          id: product.id_product,
          name: product.name_product,
          image: product.gambar_product,
          price: product.price,
          location: product.Store.location_store,
          status: product.status,
        }));

        setRecommendedProducts(formattedProducts);
      } catch (error) {
        console.error('Error fetching recommended products:', error.message);
      }
    };

    fetchStores();
    fetchRecommendedProducts();
  }, []);

  const handleSearch = (query) => {
    console.log('Search query:', query);
  };

  const handleCategoryPress = (category) => {
    console.log('Category pressed:', category);
    // Implement navigation logic here
    // navigation.navigate('CategoryPage', { category });
  };

  const handleStorePress = (store) => {
    console.log('Store pressed:', store);
    navigation.navigate('StoreUnit', { store });
  };

  const handleSeeMorePress = () => {
    navigation.navigate('Store');
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 9 }}>
          <View>
            <SearchBar onSearch={handleSearch} />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Search by Categories</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 7 }}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={{ paddingVertical: 5, width: '31%', alignItems: 'center', margin: 2 }}
                  onPress={() => handleCategoryPress(category)}
                >
                  <Icon name={category.icon} size={50} />
                  <Text style={{ textAlign: 'center', marginTop: 10 }}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Search by Stores</Text>
              <TouchableOpacity onPress={handleSeeMorePress}>
                <Text style={{ color: '#707070' }}>See More</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {stores.slice(0, 4).map((store) => (
                <TouchableOpacity onPress={() => handleStorePress(store)} key={store.id}>
                  <View style={{ marginVertical: 7, alignItems: 'center' }}>
                    {store.profile_store ? (
                      <Image
                        source={{ uri: store.profile_store }}
                        style={{ width: 80, height: 80, borderRadius: 40 }}
                      />
                    ) : (
                      <View
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 40,
                          backgroundColor: '#fff',
                          borderColor: '#d9d9d9',
                          borderWidth: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Text>No Image</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 20, paddingVertical: 10 }}>Recommended for you</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: 'row' }}>
                {recommendedProducts.map((product) => (
                  <TouchableOpacity
                    key={product.id}
                    style={{ margin: 5 }}
                    onPress={() => navigation.navigate('ProductPage', { productId: product.id })}
                  >
                    {product.image ? (
                      <Image source={{ uri: product.image }} style={{ width: 100, height: 100, borderRadius: 10 }} />
                    ) : (
                      <View
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 10,
                          backgroundColor: '#fff',
                          borderColor: '#d9d9d9',
                          borderWidth: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Icon name="image-outline" size={50} color="#222" />
                        <Text>No Image</Text>
                      </View>
                    )}
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{ width: 100 }}>{product.name}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{ width: 100 }}>Rp. {product.price}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{ width: 100 }}>{product.location}</Text>
                    {product.status === '1' && (
                      <View style={{ position: 'absolute', bottom: 0, right: 0, marginBottom: 1 }}>
                        <Icon name="flash" size={18} />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
