import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking, Share } from 'react-native';
import { MaterialCommunityIcons, Entypo, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const images = [
  { id: 1 },
  { id: 2 }
];

const ProductPage = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleGetDirections = () => {
    const url = 'https://maps.app.goo.gl/S13NzbCkjDMRE77Q9';
    Linking.openURL(url);
  };

  const goToNextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
  };

  const goToPreviousImage = () => {
    const previousIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(previousIndex);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this awesome product: Kratos Aztec Tan Boots - Rp 990.000. Handcrafted in Bandung, West Java, Indonesia.',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row justify-between items-center pb-5 px-4 shadow-md z-10">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-6" onPress={handleShare}>
            <Feather name="share-2" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleBookmark}>
            <MaterialCommunityIcons
              name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView className="flex-1">
        <View className="items-center justify-center relative">
          <View className="w-full h-72 bg-gray-300" />
        </View>
        <View className="flex-row items-center justify-center mt-2">
          <TouchableOpacity className="px-2" onPress={goToPreviousImage}>
            <Entypo name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
          <View className="flex-row items-center">
            {images.map((_, index) => (
              <TouchableOpacity
                key={index}
                className={`w-2.5 h-2.5 rounded-full mx-1 ${currentIndex === index ? 'bg-black' : 'bg-gray-500'}`}
                onPress={() => setCurrentIndex(index)}
              />
            ))}
          </View>
          <TouchableOpacity className="px-2" onPress={goToNextImage}>
            <Entypo name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View className="mt-2 p-5 rounded-lg">
          <Text className="text-xl font-bold">Product Name</Text>
          <Text className="text-lg font-semibold mt-2">Product Price</Text>
          <Text className="text-base mt-2">
            {isExpanded ? `Long Description` : `Short Description`}
          </Text>
          <TouchableOpacity onPress={toggleExpand}>
            <Text className={`text-base text-blue-500 mt-1 underline ${isExpanded ? 'mt-5' : ''}`}>
              {isExpanded ? 'Read Less' : 'Read More...'}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center my-5 p-2 rounded-lg w-11/12 self-center border border-gray-300 bg-[#e8e8e8]">
          <View className="w-12 h-12 bg-gray-300 mr-2" />
          <View className="flex-1 ">
            <Text className="text-base font-bold">Store Name</Text>
            <View className="flex-row items-center mt-1">
              <MaterialCommunityIcons name="map-marker" size={16} color="gray" />
              <Text className="text-sm text-gray-500 ml-1">Store Location</Text>
            </View>
            <TouchableOpacity onPress={handleGetDirections}>
              <Text className="text-sm text-blue-500 underline mt-1">Get Directions</Text>
            </TouchableOpacity>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductPage;
