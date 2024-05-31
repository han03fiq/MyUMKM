import React from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
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
              <View style={styles.cardImage}>
                <View style={styles.placeholder}>
                  <Text style={styles.placeholderText}>{item.title}</Text>
                </View>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.cardLocation}>
                  <MaterialCommunityIcons name="map-marker" size={16} color="white" />
                  <Text style={styles.cardLocationText}>{item.location}</Text>
                </View>
              </View>
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
    height: 150, // Adjusted height
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc', // Gray background for placeholder
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
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
