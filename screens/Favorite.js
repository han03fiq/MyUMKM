import React from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Define the items with placeholder text instead of images
const items = [
  {
    id: 1,
    title: 'Product 1',
    location: 'Location 1',
  },
  {
    id: 2,
    title: 'Product 2',
    location: 'Location 2',
  }
];

const Favorite = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-4">
        <View>
          <Text className="text-[30px] font-bold text-center">Favorite</Text>
        </View>
        <ScrollView className="flex-1 mt-6">
          {items.map(item => (
            <TouchableOpacity 
              key={item.id} 
              className="mb-5 rounded-xl overflow-hidden" 
              onPress={() => {navigation.navigate('ProductPage')}}
            >
              <View className="h-36 justify-center items-center bg-gray-300">
                <View className="justify-center items-center">
                  <Text className="text-black text-lg font-bold">{item.title}</Text>
                </View>
              </View>
              <View className="bg-black bg-opacity-30 p-2.5">
                <Text className="text-white text-lg font-bold">{item.title}</Text>
                <View className="flex-row items-center mt-1.5">
                  <MaterialCommunityIcons name="map-marker" size={16} color="white" />
                  <Text className="text-white text-sm ml-1.5">{item.location}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Favorite;
