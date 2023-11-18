import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signOut } from 'firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation';
import { SongItem } from './CustomButtons';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;


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

const Home = () => {

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleAddSong = () => {
    // signOut(FIREBASE_AUTH);
    // navigation.navigate('Login')
  };

  const handleOptions = () => {
    console.log('3 points');
    toggleModal();
  };
  const handlePlaying = () => {
    console.log('play sound');
  };
  const handleModalClose = () => {
    // Logique à exécuter lorsque le modal est fermé en cliquant à l'extérieur
    setModalVisible(false);
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Sign Out" onPress={handleAddSong} />
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={styles.modalContainer}>
            {/* Le contenu du menu contextuel */}
            <View style={styles.modalMenu}>
              <SongItem
                image={require('../assets/Icons/music.png')}
                icon={require('../assets/Icons/right-arrow.png')}
                title={"Playlist"}
                addedBy={"Choose an image from your playlist"}
                containerStyle={{ backgroundColor: 'white', borderRadius: 10, padding: 10, marginVertical: 10 }}
                titleStyle={{ fontSize: 15 }}
                imageStyle={{ height: 30, width: 30, borderRadius: 0, marginRight: 20 }}
                addedByStyle={{ fontStyle: 'italic' }}
                onImagePress={handleOptions}
              />

              <SongItem
                image={require('../assets/Icons/gallery.png')}
                icon={require('../assets/Icons/right-arrow.png')}
                title={"Upload"}
                addedBy={"Upload a goofy sound from your phone"}
                containerStyle={{ backgroundColor: 'white', borderRadius: 10, padding: 10 }}
                titleStyle={{ fontSize: 15 }}
                imageStyle={{ height: 30, width: 30, borderRadius: 0, marginRight: 20 }}
                // addedByStyle={{ fontStyle: 'italic' }}
                onImagePress={handleOptions}
              />

              <TouchableOpacity onPress={toggleModal}>
                <Text>Cancel</Text>
              </TouchableOpacity>
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

export default Home