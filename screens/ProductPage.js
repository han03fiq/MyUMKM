import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Share } from 'react-native';
import { MaterialCommunityIcons, Entypo, Feather } from '@expo/vector-icons';

const images = [
  { id: 1 },
  { id: 2 }
];

const ProductPage = ({ navigation }) => {
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon} onPress={handleShare}>
            <Feather name="share-2" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="bookmark" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.carouselContainer}>
          <View style={styles.grayBox} />
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
          <Text style={styles.title}>Product Name</Text>
          <Text style={styles.price}>Product Price</Text>
          <Text style={styles.description}>
            {isExpanded
              ? `Long Description`
              : `Short Description`}
          </Text>
          <TouchableOpacity onPress={toggleExpand}>
            <Text style={[styles.readMore, isExpanded && styles.readLess]}>{isExpanded ? 'Read Less' : 'Read More...'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerGrayBox} />
          <View style={styles.footerTextContainer}>
            <Text style={styles.footerTitle}>Store Name</Text>
            <View style={styles.locationContainer}>
              <MaterialCommunityIcons name="map-marker" size={16} color="gray" />
              <Text style={styles.footerLocation}>Store Location</Text>
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
  grayBox: {
    width: '100%',
    height: 300,
    backgroundColor: '#ccc',
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
  footerGrayBox: {
    width: 50,
    height: 50,
    backgroundColor: '#ccc',
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
