import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../utils/AuthContext';

const Profile = () => {
  const { logout } = useContext(AuthContext); // Menggunakan useContext untuk mengakses logout dari AuthContext

  const handleLogout = () => {
    // Panggil fungsi logout dari AuthContext
    logout();
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 9 }}>
      <View style={{ height: '100%', width: '100%' }}>
        <View>
          <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>Profile</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            className="bg-[#d9d9d9] rounded-[15px] py-3 px-9 items-center"
            onPress={handleLogout}
          >
            <Text style={{ color: 'black', fontSize: 18 }}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
