import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Store from '../screens/Store';
import StoreUnit from '../screens/StoreUnit';


const StackStore = createStackNavigator();

const StackStoreNavigator = () => {
  return (
    <StackStore.Navigator screenOptions={{ headerShown: false }}>
      <StackStore.Screen name="Store" component={Store} />
      <StackStore.Screen name="StoreUnit" component={StoreUnit} />
    </StackStore.Navigator>
  );
};

export default StackStoreNavigator;
