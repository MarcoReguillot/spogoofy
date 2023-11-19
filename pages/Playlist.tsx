import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signOut } from 'firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation';
import { SongItem, PlaylistItem, MusicButton } from './CustomButtons';

interface Playlist {
    id: number;
    title: string;
    image: string;
}

const playlists: Playlist[] = [
    {
        id: 1,
        title: 'Liked sounds',
        image: 'https://placekitten.com/200/200',
    },
    {
        id: 2,
        title: 'Goofy',
        image: 'https://placekitten.com/200/201',
    },

    // Ajoutez d'autres playlists ici
];

const Playlist = () => {
    const handlePlaylist = () => {
        console.log('playlist')
    }

    const renderItem = ({ item }: any) => (
        <View>
            <PlaylistItem
                image={{ uri: item.image }}
                title={item.title}
                containerStyle={{ backgroundColor: 'white', marginRight: 10 }}
                titleStyle={{ fontSize: 20, color: 'black', marginLeft: 10 }}
                imageStyle={{ height: 80, width: 80 }}
                onPress={handlePlaylist}
            />
            {/* <Image source={{ uri: item.image }} style={styles.songImage} />
          <View style={styles.songDetails}>
            <Text style={styles.songTitle}>{item.title}</Text>
            <Text style={styles.addedBy}>Added by: {item.addedBy}</Text>
          </View> */}
            {/* <SongItem
            image={{ uri: item.image }}
            icon={require('../assets/Icons/3dots.png')}
            title={item.title}
            addedBy={item.addedBy}
            containerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
            titleStyle={{ fontSize: 15 }}
            addedByStyle={{ fontStyle: 'italic' }}
            onImagePress={handleOptions}
            onPress={handlePlaying}
          /> */}
        </View>

    );

    const handleAdd = () => {
        console.log('add')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.iconTitle}>
                <Text style={styles.title}>Playlist</Text>
                <View style={styles.rightContainer}>
                    <TouchableOpacity onPress={handleAdd} style={styles.buttonContainer}>
                        <Image source={require("../assets/Icons/add.png")} style={styles.image} />
                    </TouchableOpacity>
                </View>

            </View>
            <FlatList
                data={playlists}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10
    },
    title2: {
        fontSize: 18,
        marginTop: 30,
        fontWeight: 'bold',

    },
    iconTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10, // Ajoutez un espace à droite pour laisser de la place à l'image
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer: {
        // Styles pour votre bouton
    },
    image: {
        width: 24,
        height: 24,
        // Autres styles d'image
    }

});

export default Playlist