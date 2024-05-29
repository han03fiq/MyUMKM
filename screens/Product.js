import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Product = () => {
  return (
    <SafeAreaView className="flex justify-center items-center px-[9px]">
      <View className="h-full w-full">
        <View>
            <Text className="text-[30px] font-bold text-center">Nama Product</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Product;