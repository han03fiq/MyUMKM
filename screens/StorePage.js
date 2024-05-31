import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Entypo, Feather } from '@expo/vector-icons';

const products = [
  { id: 1, name: 'Bagel & Cream Cheese', price: 'Rp 45.000' },
  { id: 2, name: 'Smoked Beef & Egg', price: 'Rp 60.000' },
  { id: 3, name: 'Smoked Brisket', price: 'Rp 88.000' },
  { id: 4, name: 'Cheese Bagel', price: 'Rp 22.000' },
  { id: 5, name: 'Nutella', price: 'Rp 50.000' },
  { id: 6, name: 'Philly Cheese Steak', price: 'Rp 60.000' },
  { id: 7, name: 'Smoked Brisket', price: 'Rp 88.000' },
  { id: 8, name: 'Cheese Bagel', price: 'Rp 22.000' },
  { id: 9, name: 'Nutella', price: 'Rp 50.000' },
];

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

const StorePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon} onPress={handleShare}>
            <Feather name="share-2" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.storeInfo}>
        <View style={styles.logoPlaceholder} />
        <View>
          <Text style={styles.storeName}>Mad Bagel</Text>
          <View style={styles.locationContainer}>
            <MaterialCommunityIcons name="map-marker" size={16} color="gray" />
            <Text style={styles.locationText}>Tamansari</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.directionsText}>Get Directions</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.productGrid}>
        {products.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <View style={styles.productImagePlaceholder} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 9,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 20, // Adjust the spacing between the icons
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  logoPlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#ccc',
    borderRadius: 25,
    marginRight: 10,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  locationText: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 5,
  },
  directionsText: {
    fontSize: 14,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productImagePlaceholder: {
    width: '100%',
    height: 100,
    backgroundColor: '#ccc',
    marginBottom: 10,
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
});

export default StorePage;
