import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login button pressed');
    // Implement login logic here
  };

  return (
    <SafeAreaView className="flex justify-center items-center px-[9px]">
      <View className="h-full w-full">
        <View>
            <Text className="text-[30px] font-bold text-center">Login</Text>
        </View>
        <View className='h-screen items-center justify-center'>
            <TextInput
            className="w-full border border-gray-300 rounded-[15px] px-4 py-2 mb-4"
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            />
            <TextInput
            className="w-full border border-gray-300 rounded-[15px] px-4 py-2 mb-4"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            />
            <TouchableOpacity
                className="bg-gray-300 rounded-[15px] px-6 py-3 items-center"
                onPress={handleLogin}
            >
                <Text className="text-black text-lg">Login</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
