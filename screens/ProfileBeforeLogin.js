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
    <SafeAreaView className="flex justify-center items-center px-[9px]" edges={['top', 'left', 'right']}>
      <View className="h-full w-full">
        <View>
            <Text className="text-[30px] font-bold text-center">Profile</Text>
        </View>
        <View className='px-[9px] items-center justify-center flex-1'>
          <Text style={styles.contentText}>
            Kamu belum Login, tekan tombol di bawah untuk Login!
          </Text>
          <TouchableOpacity 
            className="bg-[#222] rounded-[15px] py-3 px-9 items-center"
            onPress={handleLoginPress} // Use handleLoginPress function
          >
            <Text className="text-white text-lg">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default ProfileBeforeLogin;
