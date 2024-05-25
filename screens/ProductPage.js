import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { MaterialCommunityIcons, Entypo, Feather } from '@expo/vector-icons';

// Import local images
import icon from '../assets/icon.png';
import madBagel from '../assets/mad-bagel.jpg';

// Add images to the array
const images = [
  { uri: 'https://i.imgur.com/t3zQh5n.jpg' },
  icon,
  madBagel
];

const ProductPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Feather name="share-2" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="bookmark" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.carouselContainer}>
          <Image source={images[currentIndex]} style={styles.image} />
        </View>
        <View style={styles.navigationContainer}>
          <TouchableOpacity style={styles.arrowButton} onPress={goToPreviousImage}>
            <Entypo name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.dotsContainer}>
            {images.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dot,
                  currentIndex === index ? styles.activeDot : styles.inactiveDot
                ]}
                onPress={() => setCurrentIndex(index)}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.arrowButton} onPress={goToNextImage}>
            <Entypo name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>Kratos Aztec Tan Boots</Text>
          <Text style={styles.price}>Rp 990.000</Text>
          <Text style={styles.description}>
            {isExpanded
              ? `Ready stock product, ready to ship in one to two business days;
100% made from cowhide Crazy Horse leather;
Easy size-exchange guarantee (T&C applied);
Recraftable, greater in age, flexible & long-lasting;
Excellent after-sale service (maintenance, recrafting & refinishing);
Handcrafted in Bandung, West Java, Indonesia.

PRODUCT SPECIFICATION

UPPER
Upper: 1,6mm Chrome-tanned Crazy Horse leather
Lining: 1mm Breathable double mesh
Eyelet: Nickel rings
Laces: 1500mm waxed cotton

BOTTOM
Construction: 360° hand-sewn stitchdown
Shank: 140 x 20mm steel
Midsole: 150mm elastic fiber
Outsole: 200mm Rubber lug sole
Insole: 2mm chemical sheet
Toe Puff: 1.5mm chemical sheet

ADDITIONAL INFORMATION
Handlasted & machine pressed

PACKAGING
Packaging: Corrugated box, dust bag & tote bag

SIZE CHART

EUR - INSOLE (centimeter)

38 - 25
39 - 25.5
40 - 26
41 - 26.5
42 - 27.5
43 - 28
44 - 28.5
45 - 29
46 - 30
47 - 30.5
48 - 31`
              : `Ready stock product, ready to ship in one to two business days; 100% made from cowhide Crazy Horse leather; Easy size-exchange guarantee (T&C applied); Recraftable, greater in age, flexible & long-lasting; Excellent after-sale service (maintenance, recrafting & refinishing)...
`}
          </Text>
          <TouchableOpacity onPress={toggleExpand}>
            <Text style={[styles.readMore, isExpanded && styles.readLess]}>{isExpanded ? 'Read Less' : 'Read More...'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Image source={{ uri: 'https://i.imgur.com/t3zQh5n.jpg' }} style={styles.footerImage} />
          <View style={styles.footerTextContainer}>
            <Text style={styles.footerTitle}>Koku Footwear</Text>
            <View style={styles.locationContainer}>
              <MaterialCommunityIcons name="map-marker" size={16} color="gray" />
              <Text style={styles.footerLocation}>Cibaduyut</Text>
            </View>
            <TouchableOpacity onPress={handleGetDirections}>
              <Text style={styles.directions}>Get Directions</Text>
            </TouchableOpacity>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    elevation: 3,
    zIndex: 10,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 25,
  },
  content: {
    flex: 1,
  },
  carouselContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  arrowButton: {
    paddingHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'black',
  },
  inactiveDot: {
    backgroundColor: 'gray',
  },
  info: {
    marginTop: 10,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
  readMore: {
    fontSize: 16,
    color: '#007bff',
    marginTop: 0,
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  readLess: {
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  footerImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  footerTextContainer: {
    flex: 1,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  footerLocation: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 5,
  },
  directions: {
    fontSize: 14,
    color: '#007bff',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
});

export default ProductPage;
