import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyProduct from '../screens/MyProduct';
import Product from '../screens/Product'; // Mengimpor Produk.js

const StackProduct = createStackNavigator();

const StackProductNavigator = () => {
  return (
    <StackProduct.Navigator screenOptions={{ headerShown: false }}>
      <StackProduct.Screen name="MyProduct" component={MyProduct} />
      <StackProduct.Screen name="Product" component={Product} />
    </StackProduct.Navigator>
  );
};

export default StackProductNavigator;
