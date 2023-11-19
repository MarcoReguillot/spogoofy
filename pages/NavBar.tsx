import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Home from "./Home"
import Profile from "./Profile"
import Playlist from "./Playlist"
import Search from "./Search"
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation';
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';

export default function NavBar() {

    const [activeScreen, _setActiveScreen] = useState('Home');
    const [currentScreen, setCurrentScreen] = useState('Login');

    useEffect(() => {
        navigation.addListener('state', (e) => {
            if (!e.data.state)
                return;
            // console.log(e.data.state.routes[e.data.state.index].name)
            setCurrentScreen(e.data.state.routes[e.data.state.index].name)
        })
    }, [])

    const setActiveScreen = (screen: keyof RootStackParamList) => {
        _setActiveScreen(screen);
        navigation.navigate(screen)
    }

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    if (currentScreen === 'Login' || currentScreen === 'Register' || currentScreen === 'Upload') return <View></View>
    return (
        <View style={{ flex: 0.09, backgroundColor: 'white', height: "10%" }}>
            {/* <View style={{ flex: 1 }}>
                {activeScreen === 'Home' && <Home />}
                {activeScreen === 'Search' && <Search />}
                {activeScreen === 'Playlist' && <Playlist />}
                {activeScreen === 'Profile' && <Profile />}
            </View> */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>

                <TouchableOpacity onPress={() => setActiveScreen('Home')}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            style={styles.icon}
                            source={activeScreen === 'Home' ? require('../assets/Icons/home_fill.png') : require('../assets/Icons/home.png')} // Assurez-vous de remplacer le chemin par le chemin réel de votre image
                        />
                        <Text style={{ fontWeight: activeScreen === 'Home' ? '800' : '400', marginBottom: 5, fontSize: 12 }}>Home</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setActiveScreen('Search')}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            style={styles.icon}
                            source={activeScreen === 'Search' ? require('../assets/Icons/search_black.png') : require('../assets/Icons/search.png')} // Assurez-vous de remplacer le chemin par le chemin réel de votre image
                        />
                        <Text style={{ fontWeight: activeScreen === 'Search' ? '800' : '400', marginBottom: 5, fontSize: 12 }}>Search</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setActiveScreen('Playlist')}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            style={styles.icon}
                            source={activeScreen === 'Playlist' ? require('../assets/Icons/playlist_fill.png') : require('../assets/Icons/playlist.png')} // Assurez-vous de remplacer le chemin par le chemin réel de votre image
                        />
                        <Text style={{ fontWeight: activeScreen === 'Playlist' ? '800' : '400', marginBottom: 5, fontSize: 12 }}>Playlist</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setActiveScreen('Profile')}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            style={styles.icon}
                            source={activeScreen === 'Profile' ? require('../assets/Icons/profile_fill.png') : require('../assets/Icons/profile.png')} // Assurez-vous de remplacer le chemin par le chemin réel de votre image
                        />
                        <Text style={{ fontWeight: activeScreen === 'Profile' ? '800' : '400', marginBottom: 5, fontSize: 12 }}>Profile</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: 25,
        height: 25,
    },
});
