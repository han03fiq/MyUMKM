import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const ProfileBeforeLogin = () => {
  const navigation = useNavigation(); // Initialize navigation

  const handleLoginPress = () => {
    navigation.navigate('Login'); // Navigate to Login page
  };

  return (
    <SafeAreaView className="flex justify-center items-center px-[9px]">
      <View className="h-full w-full">
        <View>
            <Text className="text-[30px] font-bold text-center">Profile</Text>
        </View>
        <View className='px-[9px] items-center justify-center flex-1'>
          <Text style={styles.contentText}>
            Kamu belum Login, tekan tombol di bawah untuk Login!
          </Text>
          <TouchableOpacity 
            className="bg-[#d9d9d9] rounded-[15px] py-3 px-9 items-center"
            onPress={handleLoginPress} // Use handleLoginPress function
          >
            <Text className="text-black text-lg">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 14,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '9px',
    backgroundColor: 'red',
  },
  contentText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#d9d9d9',
    borderRadius: '15px',
    paddingVertical: '15px',
    paddingHorizontal: '30px',
  },
  loginButtonText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
});

export default ProfileBeforeLogin;
