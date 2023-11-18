import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Home from "./Home"
import Profile from "./Profile"
import Playlist from "./Playlist"
import Search from "./Search"

export default function NavBar() {

    const [activeScreen, setActiveScreen] = useState('Home');

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                {activeScreen === 'Home' && <Home />}
                {activeScreen === 'Search' && <Search />}
                {activeScreen === 'Playlist' && <Playlist />}
                {activeScreen === 'Profile' && <Profile />}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>

                <TouchableOpacity onPress={() => setActiveScreen('Home')}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            style={styles.icon}
                            source={activeScreen === 'Home' ? require('../assets/Icons/home_fill.png') : require('../assets/Icons/home.png')} // Assurez-vous de remplacer le chemin par le chemin réel de votre image
                        />
                        <Text style={{ fontWeight: activeScreen === 'Home' ? '800' : '500', marginBottom: 5 }}>Home</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setActiveScreen('Search')}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            style={styles.icon}
                            source={activeScreen === 'Search' ? require('../assets/Icons/search_black.png') : require('../assets/Icons/search.png')} // Assurez-vous de remplacer le chemin par le chemin réel de votre image
                        />
                        <Text style={{ fontWeight: activeScreen === 'Search' ? '800' : '500', marginBottom: 5 }}>Search</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setActiveScreen('Playlist')}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            style={styles.icon}
                            source={activeScreen === 'Playlist' ? require('../assets/Icons/playlist_fill.png') : require('../assets/Icons/playlist.png')} // Assurez-vous de remplacer le chemin par le chemin réel de votre image
                        />
                        <Text style={{ fontWeight: activeScreen === 'Playlist' ? '800' : '500', marginBottom: 5 }}>Playlist</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setActiveScreen('Profile')}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            style={styles.icon}
                            source={activeScreen === 'Profile' ? require('../assets/Icons/profile_fill.png') : require('../assets/Icons/profile.png')} // Assurez-vous de remplacer le chemin par le chemin réel de votre image
                        />
                        <Text style={{ fontWeight: activeScreen === 'Profile' ? '800' : '500', marginBottom: 5 }}>Profile</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
    }
});
