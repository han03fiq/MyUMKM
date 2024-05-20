import * as React from 'react';
import { View, Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Searchbar, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleClearSearch = () => {
        setSearchQuery('');
        Keyboard.dismiss();
        console.log('Search canceled and keyboard dismissed');
    };

    const handlePressOutside = () => {
        Keyboard.dismiss();
        console.log('Pressed outside, keyboard dismissed');
    };

    return (
        <TouchableWithoutFeedback onPress={handlePressOutside}>
            <View style={styles.container}>
                <Searchbar
                    placeholder="Search keywords..."
                    placeholderTextColor='#707070'
                    iconColor='#707070'
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={styles.searchBar}
                    clearIcon={searchQuery ? () => (
                        <Icon name="close-circle-outline" size={20} color="#707070" onPress={handleClearSearch} />
                    ) : undefined}
                />
                <View style={styles.iconContainer}>
                    <IconButton
                        icon={({ color, size }) => (
                            <Icon name="magnify-scan" color={color} size={size} />
                        )}
                        color="#707070"
                        size={27}
                        onPress={() => console.log('Pressed magnify-scan')}
                    />
                    <IconButton
                        icon={({ color, size }) => (
                            <Icon name="filter-outline" color={color} size={size} />
                        )}
                        color="#707070"
                        size={27}
                        onPress={() => console.log('Pressed filter-outline')}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    searchBar: {
        flex: 1,
        backgroundColor: '#D9D9D9',
        borderRadius: 15,
        marginRight: 15,
        marginLeft: -9,
    },
    iconContainer: {
        flexDirection: 'row',
        marginLeft: -1,
        marginRight: -18,
    },
});

export default SearchBar;