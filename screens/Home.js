import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import SearchBar from '../components/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Location from '../components/Location';

const Home = () => {
    const handleSearch = (query) => {

        console.log('Search query:', query);
    };

    return (
      <SafeAreaView>
        <View className='flex py-[8px] px-[14px]'>
          <View>
            <SearchBar onSearch={handleSearch} />
          <View>
            <Location/>
          </View>
          </View>
          <View className='flex mt-[10px]'>
            <Text className='font-bold text-[20px]'>Search by Categories</Text>
          </View>
        </View>
      </SafeAreaView>
        
    );
};

export default Home;
