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
    const [name, setName] = useState<string>("");


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
        const username = getDoc(doc(FIREBASE_DB, 'users', user.uid)).then((payload) => {
            console.log("username", payload.data()?.username)
            // name = payload.data()?.username;
            const uname = payload.data()?.username;
            if (uname) {
                setName(uname);
            }
        });

    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <Text style={{ marginVertical: 10, fontSize: 15 }}>My mail: {user?.email}</Text>
            <Text style={{ marginVertical: 10, fontSize: 15 }}>My name: {name}</Text>
            <Text style={{ fontWeight: 'bold', marginVertical: 10, fontSize: 25 }}>Contact</Text>
            <Text style={{ marginVertical: 10, fontSize: 15 }}>Number: +33 6 66 66 66 66</Text>
            <Text style={{ marginVertical: 10, fontSize: 15 }}>Mail: spoogofy.enterprise@spo.com</Text>
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
    title: {
        fontWeight: 'bold',
        fontSize: 32,
        marginBottom: 10
    }
});

export default Profile