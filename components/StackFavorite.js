import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Favorite from '../screens/Favorite';
import ProductPage from '../screens/ProductPage';


const StackFavorite = createStackNavigator();

const StackFavoriteNavigator = () => {
  return (
    <StackFavorite.Navigator screenOptions={{ headerShown: false }}>
      <StackFavorite.Screen name="Favorite" component={Favorite}/>
      <StackFavorite.Screen name="ProductPage" component={ProductPage}/>
    </StackFavorite.Navigator>
  );
};

export default StackFavoriteNavigator;
