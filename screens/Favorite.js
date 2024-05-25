import React from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import local images
import icon from '../assets/icon.png';
import madBagel from '../assets/mad-bagel.jpg';

// Add images to the array
const items = [
  {
    id: 1,
    title: 'Kratos Aztec Tan Boots',
    location: 'Koku Footwear, Kab. Bandung',
    image: icon,
  },
  {
    id: 2,
    title: 'Nutella Bagel Sandwich',
    location: 'Mad Bagel, Kota Bandung',
    image: madBagel,
  }
];

const Favorite = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.title}>Favorite</Text>
        </View>
        <ScrollView style={styles.content}>
          {items.map(item => (
            <TouchableOpacity key={item.id} style={styles.card}>
              <ImageBackground source={item.image} style={styles.cardImage} imageStyle={styles.cardImageStyle}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <View style={styles.cardLocation}>
                    <MaterialCommunityIcons name="map-marker" size={16} color="white" />
                    <Text style={styles.cardLocationText}>{item.location}</Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))}
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
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 0,
  },
  content: {
    flex: 1,
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    height: 200,
    justifyContent: 'flex-end',
  },
  cardImageStyle: {
    borderRadius: 10,
  },
  cardContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  cardLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  cardLocationText: {
    fontSize: 14,
    color: 'white',
    marginLeft: 5,
  },
});

export default Favorite;
