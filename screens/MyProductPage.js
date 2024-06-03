import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking, Share, Alert } from 'react-native';
import { MaterialCommunityIcons, Entypo, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const images = [
  { id: 1 },
  { id: 2 }
];

const MyProductPage = ({ navigation }) => {
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

  const handleHighlightProduct = () => {
    Alert.alert('Product Highlighted', 'This product has been highlighted successfully!');
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
        <View className="mt-5 mb-10 items-center">
          <TouchableOpacity 
            className="bg-[#222] py-3 px-10 rounded-full"
            onPress={handleHighlightProduct}
          >
            <Text className="text-white text-lg font-semibold">Highlight This Product</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProductPage;
