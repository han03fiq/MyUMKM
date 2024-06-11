import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyProduct from '../screens/MyProduct';
import MyProductPage from '../screens/MyProductPage';
import TambahProduk from '../screens/TambahProduk';
import TambahStore from '../screens/TambahStore';

const StackMyProductPage = createStackNavigator();

const StackMyProductPageNavigator = () => {
  return (
    <StackMyProductPage.Navigator screenOptions={{ headerShown: false }}>
      <StackMyProductPage.Screen name="MyProduct" component={MyProduct} />
      <StackMyProductPage.Screen name="MyProductPage" component={MyProductPage} />
      <StackMyProductPage.Screen name="TambahProduk" component={TambahProduk} />
      <StackMyProductPage.Screen name="TambahStore" component={TambahStore} />
    </StackMyProductPage.Navigator>
  );
};

export default StackMyProductPageNavigator;
