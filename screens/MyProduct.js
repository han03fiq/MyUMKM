import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const products = [
  { id: '1', name: 'Product 1', description: 'Description of Product 1', price: '$10' },
  { id: '2', name: 'Product 2', description: 'Description of Product 2', price: '$20' },
  { id: '3', name: 'Product 3', description: 'Description of Product 3', price: '$30' },
  // Add more products as needed
];

const ProductCard = ({ name, description, price }) => (
  <View className="bg-white rounded-lg shadow-md p-4 mb-4">
    <Text className="text-xl font-bold mb-2">{name}</Text>
    <Text className="text-gray-600">{description}</Text>
    <Text className="text-gray-800 font-bold mt-2">{price}</Text>
  </View>
);

const MyProduct = () => {
  return (
    <SafeAreaView className="flex justify-center items-center px-[9px]">
      <View className="h-full w-full">
        <View>
            <Text className="text-[30px] font-bold text-center">My Product</Text>
        </View>
        <View className="mt-6">
          {products.map(product => (
            <ProductCard
              key={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyProduct;
