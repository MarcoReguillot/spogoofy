import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signOut } from 'firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation';
import { SongItem, PlaylistItem, MusicButton } from './CustomButtons';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

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

const Playlist = ({ navigation }: Props) => {

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleAdd = () => {
        toggleModal();

        console.log('add')
    }

    const handleUpload = () => {
        navigation.navigate('Upload')
    }

    const handleModalClose = () => {
        // Logique à exécuter lorsque le modal est fermé en cliquant à l'extérieur
        setModalVisible(false);
    };
    const handlePlaylist = () => {
        console.log('playlist');
        navigation.navigate('SongList')

    };

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
        </View>

    );



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
            {/* <FlatList
                data={playlists}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            /> */}
            <PlaylistItem
                image={require('../assets/Icons/Liked_sound.png')}
                title="Liked sounds"
                containerStyle={{ backgroundColor: 'white', marginRight: 10 }}
                titleStyle={{ fontSize: 20, color: 'black', marginLeft: 10 }}
                imageStyle={{ height: 80, width: 80 }}
                onPress={handlePlaylist}
            />
            <PlaylistItem
                image={require('../assets/Icons/Goofy.png')}
                title="Goofy"
                containerStyle={{ backgroundColor: 'white', marginRight: 10 }}
                titleStyle={{ fontSize: 20, color: 'black', marginLeft: 10 }}
                imageStyle={{ height: 80, width: 80 }}
                onPress={handlePlaylist}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
                <TouchableWithoutFeedback onPress={handleModalClose}>
                    <View style={styles.modalContainer}>

                        <View style={styles.modalMenu}>
                            <View>
                                <Image source={require("../assets/Icons/test.png")} />
                            </View>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>Create</Text>
                            <SongItem
                                image={require('../assets/Icons/music.png')}
                                icon={require('../assets/Icons/right-arrow.png')}
                                title={"Playlist"}
                                addedBy={"Choose an image from your playlist"}
                                containerStyle={{ backgroundColor: 'white', borderRadius: 10, padding: 10, marginVertical: 10 }}
                                titleStyle={{ fontSize: 15 }}
                                imageStyle={{ height: 30, width: 30, borderRadius: 0, marginRight: 20 }}
                                addedByStyle={{ fontStyle: 'italic' }}
                                onPress={handleAdd}
                            />

                            <SongItem
                                image={require('../assets/Icons/Upload.png')}
                                icon={require('../assets/Icons/right-arrow.png')}
                                title={"Upload"}
                                addedBy={"Upload a goofy sound from your phone"}
                                containerStyle={{ backgroundColor: 'white', borderRadius: 10, padding: 10 }}
                                titleStyle={{ fontSize: 15 }}
                                imageStyle={{ height: 30, width: 30, borderRadius: 0, marginRight: 20 }}
                                // addedByStyle={{ fontStyle: 'italic' }}
                                onPress={handleUpload}

                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

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
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,

    },

});

export default Playlist