import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Location = ({ initialKota = "Bandung", initialProvinsi = "Jawa Barat" }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedKota, setSelectedKota] = useState(initialKota);
    const [selectedProvinsi, setSelectedProvinsi] = useState(initialProvinsi);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const closeOverlay = () => {
        setShowDropdown(false);
    };

    const selectLocation = (kota, provinsi) => {
        setSelectedKota(kota);
        setSelectedProvinsi(provinsi);
        setShowDropdown(false);
    };

    return (
        <View style={styles.container}>
            <Icon name="map-marker-outline" size={23} color="#333" />
            <View style={styles.locationText}>
                <Text style={styles.kota}>{selectedKota}, </Text>
                <Text style={styles.provinsi}>{selectedProvinsi}</Text>
                <TouchableOpacity onPress={toggleDropdown}>
                    <Icon name={showDropdown ? "chevron-up" : "chevron-down"} size={20} color="#333" />
                </TouchableOpacity>
            </View>
            {showDropdown && (
                <>
                    <TouchableOpacity style={styles.overlayBackground} onPress={closeOverlay} activeOpacity={1} />
                    <View style={[styles.overlay, Platform.OS === 'android' && { elevation: 5 }]}>
                        <TouchableOpacity onPress={() => selectLocation('Contoh Kota 1', 'Provinsi')}>
                            <Text style={styles.overlayText}>Contoh Kota 1, Provinsi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => selectLocation('Contoh Kota 2', 'Provinsi')}>
                            <Text style={styles.overlayText}>Contoh Kota 2, Provinsi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => selectLocation('Contoh Kota 3', 'Provinsi')}>
                            <Text style={styles.overlayText}>Contoh Kota 3, Provinsi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => selectLocation('Contoh Kota 4', 'Provinsi')}>
                            <Text style={styles.overlayText}>Contoh Kota 4, Provinsi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => selectLocation('Contoh Kota 5', 'Provinsi')}>
                            <Text style={styles.overlayText}>Contoh Kota 5, Provinsi</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        marginLeft: -5,
    },
    locationText: {
        marginLeft: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    kota: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333',
    },
    provinsi: {
        fontSize: 15,
        color: '#666',
        marginRight: 5,
    },
    overlayBackground: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },
    overlay: {
        position: 'absolute',
        backgroundColor: '#222',
        zIndex: 99,
        top: 50,
        left: 0,
        right: 0,
        padding: 20,
    },
    overlayText: {
        fontSize: 16,
        color: '#FFF',
        marginBottom: 10,
    },
});

export default Location;