import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Favorite = () => {
  return (
    <SafeAreaView className="flex justify-center items-center px-[9px]">
      <View className="h-full w-full">
        <View>
            <Text className="text-[30px] font-bold text-center">Favorite</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Favorite;
