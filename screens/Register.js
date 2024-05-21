import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Register = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = () => {
    console.log('Register button pressed');
    // Implement registration logic here
    
    // After registration logic, navigate to the Login page
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView className="flex justify-center items-center px-[9px]">
      <View className="h-full w-full">
        <View>
            <Text className="text-[30px] font-bold text-center">Register</Text>
        </View>
        <View className='items-center justify-center flex-1'>
          <TextInput
            className="w-full border border-[#606060] bg-white rounded-[15px] px-4 py-5 mb-4"
            placeholder="Masukkan email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            className="w-full border border-[#606060] bg-white rounded-[15px] px-4 py-5 mb-4"
            placeholder="Masukkan password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            className="w-full border border-[#606060] bg-white rounded-[15px] px-4 py-5 mb-4"
            placeholder="Masukkan ulang password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <TouchableOpacity 
            className="bg-[#d9d9d9] rounded-[15px] py-3 px-9 items-center"
            onPress={handleRegister}>
            <Text className="text-black text-lg">Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;
