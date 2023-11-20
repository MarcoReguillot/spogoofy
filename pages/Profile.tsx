import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH, FIREBASE_DB } from '../FirebaseConfig';
import { signOut } from 'firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation';
import { SongItem, CustomButtons } from './CustomButtons';
import { doc, getDoc } from 'firebase/firestore';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;


const Profile = ({ navigation }: Props) => {

    const handleSignOut = () => {
        signOut(FIREBASE_AUTH);
        navigation.navigate('Login')
    };

    // get the current user
    const user = FIREBASE_AUTH.currentUser;

    useEffect(() => {
        if (!user) {
            navigation.navigate('Login')
            return;
        }
        const username = getDoc(doc(FIREBASE_DB, 'users', user.uid))
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Text>Profile</Text>
            <Text>{user?.email}</Text>
            <CustomButtons
                text={"Sign Out"}
                onPressed={handleSignOut}
                type={"PRIMARY"}
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
    songImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    songDetails: {
        flex: 1,
    },
    songTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    addedBy: {
        color: 'gray',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Fond semi-transparent pour l'effet de modal
    },
    modalMenu: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,

    }
});

export default Profile