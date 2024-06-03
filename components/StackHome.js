import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import ProductPage from '../screens/ProductPage'; // Mengimpor Product.js
import StoreUnit from '../screens/StoreUnit';


const StackHome = createStackNavigator();

const StackHomeNavigator = () => {
  return (
    <StackHome.Navigator screenOptions={{ headerShown: false }}>
      <StackHome.Screen name="Home" component={Home} />
      <StackHome.Screen name="StoreUnit" component={StoreUnit} />
      <StackHome.Screen name="ProductPage" component={ProductPage} />
    </StackHome.Navigator>
  );
};

export default StackHomeNavigator;
