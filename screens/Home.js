import React from 'react';
import { View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Importing icons from MaterialCommunityIcons
import SearchBar from '../components/SearchBar';

const categories = [
  { id: 1, name: 'Fashion', icon: 'hanger' },
  { id: 2, name: 'Home and Kitchen', icon: 'countertop' },
  { id: 3, name: 'Handicraft', icon: 'hand-heart' },
  { id: 4, name: 'Gadget', icon: 'monitor-cellphone' },
  { id: 5, name: 'Food and Beverages', icon: 'food' },
  { id: 6, name: 'Beauty', icon: 'creation' },
];

const stores = [
  { id: 1, name: 'Store 1', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Store 2', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Store 3', image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Store 4', image: 'https://via.placeholder.com/150' },
];

const products = [
  { id: 1, name: 'Product 1', image: 'https://via.placeholder.com/150', price: '$10', location: 'Location 1' },
  { id: 2, name: 'Product 2', image: 'https://via.placeholder.com/150', price: '$20', location: 'Location 2' },
  { id: 3, name: 'Product 3', image: 'https://via.placeholder.com/150', price: '$30', location: 'Location 3' },
  { id: 4, name: 'Product 4', image: 'https://via.placeholder.com/150', price: '$40', location: 'Location 4' },
  { id: 5, name: 'Product 5', image: 'https://via.placeholder.com/150', price: '$50', location: 'Location 5' },
  { id: 6, name: 'Product 6', image: 'https://via.placeholder.com/150', price: '$60', location: 'Location 6' },
];

const Home = ({ navigation }) => {
  const handleSearch = (query) => {
    console.log('Search query:', query);
  };

  const handleCategoryPress = (category) => {
    console.log('Category pressed:', category);
    // Implement navigation logic here
    // navigation.navigate('CategoryPage', { category });
  };

  const handleSeeMorePress = () => {
    navigation.navigate('Store');
  };

  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={{ flex: 1 }}> 
          <View style={{ paddingHorizontal: 9}}>
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
                {stores.map((store) => (
                  <View key={store.id} style={{ marginVertical: 7, alignItems: 'center' }}>
                    <Image
                      source={{ uri: store.image }}
                      style={{ width: 80, height: 80, borderRadius: 40 }}
                    />
                  </View>
                ))}
              </View>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20, paddingVertical: 10 }}>Recommended for you</Text>
              <ScrollView horizontal>
                <View style={{ flexDirection: 'row' }}>
                  {products.map((product) => (
                    <TouchableOpacity key={product.id} style={{ margin: 5 }}>
                      <Image source={{ uri: product.image }} style={{ width: 100, height: 100, borderRadius: 10 }} />
                      <Text style={{ textAlign: 'center' }}>{product.name}</Text>
                      <Text style={{ textAlign: 'center' }}>{product.price}</Text>
                      <Text style={{ textAlign: 'center' }}>{product.location}</Text>
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
