import React, { useState } from 'react';
import { View, Text, Button, FlatList, Dimensions, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signOut } from 'firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation';
import { GenreInputButton } from './CustomButtons';
import { SearchInput } from './CustomInputs';

const screenWidth = Dimensions.get('window').width;


const Search = () => {

    const handleTest = () => {
        console.log("test")
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Search</Text>
            <SearchInput />
            <Text style={styles.title2}>Your top genre</Text>
            <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>

                <GenreInputButton text="Mario" onPress={handleTest} imageStyle={{ backgroundColor: 'red', width: (screenWidth / 2) - 25 }} />
                <GenreInputButton text="Zelda" onPress={handleTest} imageStyle={{ backgroundColor: 'green', width: (screenWidth / 2) - 25 }} />

            </View>
            <Text style={styles.title2}>Browse all</Text>
            <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>

                <GenreInputButton text="Roblox" onPress={handleTest} imageStyle={{ backgroundColor: 'brown', width: (screenWidth / 2) - 25 }} />
                <GenreInputButton text="Minecraft" onPress={handleTest} imageStyle={{ backgroundColor: 'green', width: (screenWidth / 2) - 25 }} />

            </View>
            <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>

                <GenreInputButton text="Gang Beast" onPress={handleTest} imageStyle={{ backgroundColor: 'orange', width: (screenWidth / 2) - 25 }} />
                <GenreInputButton text="COD" onPress={handleTest} imageStyle={{ backgroundColor: 'brown', width: (screenWidth / 2) - 25 }} />

            </View>
            <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>

                <GenreInputButton text="Fortnite" onPress={handleTest} imageStyle={{ backgroundColor: 'blue', width: (screenWidth / 2) - 25 }} />
                <GenreInputButton text="Crash Bandicoot" onPress={handleTest} imageStyle={{ backgroundColor: 'orange', width: (screenWidth / 2) - 25 }} />

            </View>

        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
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

    }
});

export default Search