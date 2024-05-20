import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Keyboard, Platform } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Home from '../screens/Home';
import Category from '../screens/Category';
import Store from '../screens/Store';
import Favorite from '../screens/Favorite';
import ProfileBeforeLogin from '../screens/ProfileBeforeLogin';

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
    const insets = useSafeAreaInsets();
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    if (isKeyboardVisible) {
        return null; // Return null to hide the tab bar when keyboard is visible
    }

    return (
        <View style={[styles.tabBar, { paddingBottom: insets.bottom }]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                    ? options.title
                    : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!event.defaultPrevented) {
                        navigation.dispatch({
                            ...CommonActions.navigate(route.name, route.params),
                            target: state.key,
                        });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={[styles.tabItem, isFocused ? styles.tabItemFocused : null]}
                    >
                        <Icon
                            name={isFocused ? options.focusedIcon : options.unfocusedIcon}
                            size={Platform.OS === 'ios' ? 24 : 28} // Adjust size for iOS and Android
                            color={isFocused ? '#FFF' : '#222'}
                        />
                        <Text style={{ color: isFocused ? '#FFF' : '#222', fontSize: 12 }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default function BottomNav() {
    return (
        <SafeAreaProvider>
            <Tab.Navigator
                tabBar={props => <CustomTabBar {...props} />}
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarLabel: 'Home',
                        focusedIcon: 'home',
                        unfocusedIcon: 'home-outline',
                    }}
                />
                <Tab.Screen
                    name="Category"
                    component={Category}
                    options={{
                        tabBarLabel: 'Category',
                        focusedIcon: 'view-list',
                        unfocusedIcon: 'view-list-outline',
                    }}
                />
                <Tab.Screen
                    name="Store"
                    component={Store}
                    options={{
                        tabBarLabel: 'Store',
                        focusedIcon: 'store',
                        unfocusedIcon: 'store-outline',
                    }}
                />
                <Tab.Screen
                    name="Favorite"
                    component={Favorite}
                    options={{
                        tabBarLabel: 'Favorite',
                        focusedIcon: 'heart',
                        unfocusedIcon: 'heart-outline',
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileBeforeLogin}
                    options={{
                        tabBarLabel: 'Profile',
                        focusedIcon: 'account',
                        unfocusedIcon: 'account-outline',
                    }}
                />
            </Tab.Navigator>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#D9D9D9',
        height: Platform.OS === 'ios' ? 85 : 75, // Adjust height for iOS and Android
        alignItems: 'center',
        justifyContent: 'space-between', // Distribute items evenly with space between
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Platform.OS === 'ios' ? 5 : 6, // Adjust padding for iOS and Android
        marginHorizontal: 3,
        marginTop: Platform.OS === 'ios' ? 10 : 4,
    },
    tabItemFocused: {
        backgroundColor: '#333333',
        borderRadius: 15,
        height: 55,
    },
});