import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileBeforeLogin from '../screens/ProfileBeforeLogin';
import ProfileScreen from '../screens/ProfileAfterLogin';
import TambahStore from '../screens/TambahStore';
import { AuthContext } from '../utils/AuthContext';

const StackProfile = createStackNavigator();

const StackProfileNavigator = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <StackProfile.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <StackProfile.Screen name="ProfileAfterLogin" component={ProfileScreen} />
          <StackProfile.Screen name="TambahStore" component={TambahStore} />
        </>
      ) : (
        <StackProfile.Screen name="ProfileBeforeLogin" component={ProfileBeforeLogin} />
      )}
    </StackProfile.Navigator>
  );
};

export default StackProfileNavigator;
