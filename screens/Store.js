import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Store = ({ navigation }) => {
  const stores = [
    { id: 1, name: 'Mad Bagel', image: 'https://via.placeholder.com/100', location: 'Tamansari' },
    { id: 2, name: 'Mad Bagel', image: 'https://via.placeholder.com/100', location: 'Tamansari' },
    { id: 3, name: 'Mad Bagel', image: 'https://via.placeholder.com/100', location: 'Tamansari' },
    { id: 4, name: 'Mad Bagel', image: 'https://via.placeholder.com/100', location: 'Tamansari' },
    { id: 5, name: 'Mad Bagel', image: 'https://via.placeholder.com/100', location: 'Tamansari' },
    { id: 6, name: 'Mad Bagel', image: 'https://via.placeholder.com/100', location: 'Tamansari' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.title}>Store</Text>
        </View>
      <ScrollView showsVerticalScrollIndicator='false' className='mt-6'>
        <View>
          <View style={styles.header}>
            <Text style={[styles.subtitle, {textAlign: 'left'}]}>Fashion</Text>
            <View style={styles.line} />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator='false'>
            <View style={{ flexDirection: 'row' }}>
              {stores.map((store) => (
                <TouchableOpacity key={store.id} style={styles.storeContainer} onPress={() => navigation.navigate('StoreUnit')}>
                  <Image source={{ uri: store.image }} style={styles.image} />
                  <Text style={styles.storeName}>{store.name}</Text>
                  <Text style={styles.storeLocation}>{store.location}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        <View className='my-[10px]'>
          <View style={styles.header}>
            <Text style={[styles.subtitle, {textAlign: 'left'}]}>Home and Kitchen</Text>
            <View style={styles.line} />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator='false'>
            <View style={{ flexDirection: 'row' }}>
              {stores.map((store) => (
                <TouchableOpacity key={store.id} style={styles.storeContainer} onPress={() => navigation.navigate('StoreUnit')}>
                  <Image source={{ uri: store.image }} style={styles.image} />
                  <Text style={styles.storeName}>{store.name}</Text>
                  <Text style={styles.storeLocation}>{store.location}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        <View>
          <View style={styles.header}>
            <Text style={[styles.subtitle, {textAlign: 'left'}]}>Handicraft</Text>
            <View style={styles.line} />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator='false'>
            <View style={{ flexDirection: 'row' }}>
              {stores.map((store) => (
                <TouchableOpacity key={store.id} style={styles.storeContainer} onPress={() => navigation.navigate('StoreUnit')}>
                  <Image source={{ uri: store.image }} style={styles.image} />
                  <Text style={styles.storeName}>{store.name}</Text>
                  <Text style={styles.storeLocation}>{store.location}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        <View className='my-[10px]'>
          <View style={styles.header}>
            <Text style={[styles.subtitle, {textAlign: 'left'}]}>Gadget</Text>
            <View style={styles.line} />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator='false'>
            <View style={{ flexDirection: 'row' }}>
              {stores.map((store) => (
                <TouchableOpacity key={store.id} style={styles.storeContainer} onPress={() => navigation.navigate('StoreUnit')}>
                  <Image source={{ uri: store.image }} style={styles.image} />
                  <Text style={styles.storeName}>{store.name}</Text>
                  <Text style={styles.storeLocation}>{store.location}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        <View>
          <View style={styles.header}>
            <Text style={[styles.subtitle, {textAlign: 'left'}]}>Food & Beverages</Text>
            <View style={styles.line} />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator='false'>
            <View style={{ flexDirection: 'row' }}>
              {stores.map((store) => (
                <TouchableOpacity key={store.id} style={styles.storeContainer} onPress={() => navigation.navigate('StoreUnit')}>
                  <Image source={{ uri: store.image }} style={styles.image} />
                  <Text style={styles.storeName}>{store.name}</Text>
                  <Text style={styles.storeLocation}>{store.location}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        <View className='my-[10px]'>
          <View style={styles.header}>
            <Text style={[styles.subtitle, {textAlign: 'left'}]}>Beauty</Text>
            <View style={styles.line} />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator='false'>
            <View style={{ flexDirection: 'row' }}>
              {stores.map((store) => (
                <TouchableOpacity key={store.id} style={styles.storeContainer} onPress={() => navigation.navigate('StoreUnit')}>
                  <Image source={{ uri: store.image }} style={styles.image} />
                  <Text style={styles.storeName}>{store.name}</Text>
                  <Text style={styles.storeLocation}>{store.location}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      </View>      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header: {
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 8,
  },
  storeContainer: {
    margin: 5,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  storeName: {
    textAlign: 'center',
    marginTop: 5,
  },
  storeLocation: {
    textAlign: 'center',
    color: 'gray',
  },
});

export default Store;