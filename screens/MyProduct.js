import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'; // pastikan Anda telah menginstal react-native-vector-icons

const initialProducts = [
  { id: '1', name: 'Product 1', description: 'Description of Product 1', price: '$10', image: 'https://via.placeholder.com/150' },
  // Add more products as needed
];

const ProductCard = ({ id, name, description, price, image, onDelete, navigation }) => (
  <View className="bg-white rounded-lg shadow-md py-3 px-4 mb-3 flex-row">
    <Image
      source={{ uri: image }}
      className="w-[110px] h-[90px] rounded-lg mr-4"
    />
    <View className="flex-1">
      <TouchableOpacity onPress={() => navigation.navigate('Product', { id, name, description, price, image })}>
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
  const [products, setProducts] = useState(initialProducts);

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

  return (
    <SafeAreaView className="flex-1 justify-center items-center px-[9px]">
      <View className="h-full w-full ">
        <View>
          <Text className="text-[30px] font-bold text-center">My Product</Text>
        </View>
        <View className="mt-6">
          {products.map(product => (
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
          ))}
        </View>
      </View>
      <TouchableOpacity className="absolute bottom-5 right-5 bg-[#222] w-[60px] h-[60px] rounded-full justify-center items-center shadow-lg" onPress={addProduct}>
        <Icon name="add" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MyProduct;
