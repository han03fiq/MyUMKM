import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileBeforeLogin from '../screens/ProfileBeforeLogin';
import ProfileScreen from '../screens/ProfileAfterLogin';


const StackProfile = createStackNavigator();

const StackProfileNavigator = () => {
  return (
    <StackProfile.Navigator screenOptions={{ headerShown: false }}>
      <StackProfile.Screen name="ProfileBeforeLogin" component={ProfileBeforeLogin} />
      <StackProfile.Screen name="ProfileAfterLogin" component={ProfileScreen} />
    </StackProfile.Navigator>
  );
};

export default StackProfileNavigator;
