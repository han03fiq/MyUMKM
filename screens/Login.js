import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Register from './Register';
import ProfileAfterLogin from './ProfileAfterLogin';

const Stack = createStackNavigator();

const handleClearSearch = () => {
  setSearchQuery('');
  Keyboard.dismiss();
  console.log('Search canceled and keyboard dismissed');
};

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login button pressed');
    // Implement login logic here
    
    // After successful login logic, navigate to the ProfileAfterLogin page
    navigation.navigate('ProfileAfterLogin');
  };

  return (
    <SafeAreaView className="flex justify-center items-center px-[9px]">
      <View className="h-full w-full">
        <View>
            <Text className="text-[30px] font-bold text-center">Login</Text>
        </View>
        <View className='h-screen items-center justify-center'>
            <TextInput
            className="w-full border border-[#606060] bg-white rounded-[15px] px-4 py-5 mb-4"
            placeholder="Masukkan email"
            value={email}
            onChangeText={setEmail}
            />
            <TextInput
            className="w-full border border-[#606060] bg-white rounded-[15px] px-4 py-5 mb-4"
            placeholder="Masukkan password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            />
            <TouchableOpacity
                className="bg-[#d9d9d9] rounded-[15px] py-3 px-9 items-center"
                onPress={handleLogin}
            >
                <Text className="text-black text-lg">Login</Text>
            </TouchableOpacity>
            <View className="mt-4 flex-row">
                <Text>Belum memiliki akun? klik </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text className="text-blue-600 underline">di sini</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;