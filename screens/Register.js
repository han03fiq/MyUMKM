import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import throttle from 'lodash.throttle';
import { signUpWithEmail } from '../utils/api';

const isEmailValid = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const Register = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const handleRegister = throttle(async () => {
    try {
      await signUpWithEmail(username, email, password);
      Alert.alert('Success', 'User registered successfully');
      navigation.navigate('Login');
    } catch (error) {
      if (error.message.includes('rate limit')) {
        Alert.alert('Error', 'Too many requests. Please try again later.');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  }, 30000); // 30 seconds throttle

  const isButtonDisabled = !username || !isEmailValid(email) || password.length < 6;

  return (
    <SafeAreaView className="flex justify-center items-center px-[9px]">
      <View className="h-full w-full">
        <View>
          <Text className="text-[30px] font-bold text-center">Register</Text>
        </View>
        <View className='items-center justify-center flex-1'>
          <TextInput
            className="w-full border border-[#606060] bg-white rounded-[15px] px-4 py-5 mb-4"
            placeholder="Masukkan username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
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
          <TouchableOpacity 
            className="bg-[#222] rounded-[15px] py-3 px-9 items-center"
            onPress={handleRegister}
            disabled={isButtonDisabled}
            style={{ opacity: isButtonDisabled ? 0.4 : 1 }}
          >
            <Text className="text-white text-lg">Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;