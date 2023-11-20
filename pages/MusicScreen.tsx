import React, { useState } from 'react';
import { View, Image, Text, Button, FlatList, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signOut } from 'firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation';
import { SongItem } from './CustomButtons';

const songs = [
    {
        id: 1,
        title: 'Cat goofy 1',
        image: 'https://placekitten.com/200/200', // Example image URL
        addedBy: 'John Doe',
    },
    {
        id: 2,
        title: 'Song 2',
        image: 'https://placekitten.com/200/201', // Example image URL
        addedBy: 'Jane Doe',
    },
];

const MusicScreen = () => {

    const handleOptions = () => {
        console.log('3 points');
        // toggleModal();
    };
    const handlePlaying = () => {
        console.log('play sound');
    };

    const handlePlaylist = () => {
        console.log('playlist')
    }

    const renderItem = ({ item }: any) => (
        <View style={styles.songContainer}>
            {/* <Image source={{ uri: item.image }} style={styles.songImage} />
          <View style={styles.songDetails}>
            <Text style={styles.songTitle}>{item.title}</Text>
            <Text style={styles.addedBy}>Added by: {item.addedBy}</Text>
          </View> */}
            <SongItem
                image={{ uri: item.image }}
                icon={require('../assets/Icons/3dots.png')}
                title={item.title}
                addedBy={item.addedBy}
                containerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
                titleStyle={{ fontSize: 15 }}
                addedByStyle={{ fontStyle: 'italic' }}
                onImagePress={handleOptions}
                onPress={handlePlaying}
            />
        </View>

    );

    const handleAdd = () => {
        console.log('add')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.iconTitle}>
                <Text style={styles.title}>Liked sounds</Text>
                <View style={styles.rightContainer}>
                    <TouchableOpacity onPress={handleAdd} style={styles.buttonContainer}>
                        <Image source={require("../assets/Icons/play.png")} style={styles.image} />
                    </TouchableOpacity>
                </View>

            </View>
            <FlatList
                data={songs}
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
    songContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    title2: {
        fontSize: 18,
        marginTop: 30,
        fontWeight: 'bold',

    },
    iconTitle: {
        marginBottom: 30,

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
        width: 30,
        height: 30,
        // Autres styles d'image
    }

});


export default MusicScreen