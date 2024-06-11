import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../utils/AuthContext';

const isEmailValid = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const Login = ({ navigation }) => {
  const { signInWithEmail } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Login button pressed');
      await signInWithEmail(email, password);
      navigation.navigate('Profile');
    } catch (error) {
      console.error('Error during login:', error.message);
      Alert.alert('Login Failed', error.message);
    }
  };

  const isButtonDisabled = !isEmailValid(email) || password.length < 6;

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 9 }}>
      <View style={{ height: '100%', width: '100%' }}>
        <View>
          <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>Login</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
            className="bg-[#222] rounded-[15px] py-3 px-9 items-center"
            onPress={handleLogin}
            style={{ opacity: isButtonDisabled ? 0.4 : 1 }}
          >
            <Text style={{ color: 'white', fontSize: 18 }}>Login</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 16, flexDirection: 'row' }}>
            <Text>Belum punya akun? Klik </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{ color: '#0000ff', textDecorationLine: 'underline' }}>di sini!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
