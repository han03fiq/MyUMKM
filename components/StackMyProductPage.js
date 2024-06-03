import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyProduct from '../screens/MyProduct';
import MyProductPage from '../screens/MyProductPage';
import TambahProduk from '../screens/TambahProduk';

const StackMyProductPage = createStackNavigator();

const StackMyProductPageNavigator = () => {
  return (
    <StackMyProductPage.Navigator screenOptions={{ headerShown: false }}>
      <StackMyProductPage.Screen name="MyProduct" component={MyProduct} />
      <StackMyProductPage.Screen name="MyProductPage" component={MyProductPage} />
      <StackMyProductPage.Screen name="TambahProduk" component={TambahProduk} />
    </StackMyProductPage.Navigator>
  );
};

export default StackMyProductPageNavigator;
