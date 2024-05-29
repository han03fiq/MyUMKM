import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Product from '../screens/Product'; // Mengimpor Product.js
import StoreUnit from '../screens/StoreUnit';


const StackProduct = createStackNavigator();

const StackHomeNavigator = () => {
  return (
    <StackProduct.Navigator screenOptions={{ headerShown: false }}>
      <StackProduct.Screen name="Home" component={Home} />
      <StackProduct.Screen name="StoreUnit" component={StoreUnit} />
      <StackProduct.Screen name="Product" component={Product} />
    </StackProduct.Navigator>
  );
};

export default StackHomeNavigator;
