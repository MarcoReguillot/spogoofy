import React, { useState } from 'react';
import { View, Text, Image, Button, Dimensions, FlatList, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation';
import { SongItem, PlaylistItem, MusicButton } from './CustomButtons';

// type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

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

const newSongs = [
  {
    id: 1,
    title: 'Cat goofy 1',
    image: 'https://placekitten.com/200/200', // Example image URL
  },
  {
    id: 2,
    title: 'Song 2',
    image: 'https://placekitten.com/200/201', // Example image URL
  },
  {
    id: 3,
    title: 'Song 2',
    image: 'https://placekitten.com/200/201', // Example image URL
  },


];

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

const Home = ({ navigation }: Props) => {

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
  const handlePlaylist = () => {
    console.log('playlist');
    navigation.navigate('SongList')

  };
  const handleModalClose = () => {
    // Logique à exécuter lorsque le modal est fermé en cliquant à l'extérieur
    setModalVisible(false);
  };
  const handleNewSong = () => {
    console.log('new song');
  }

  const screenWidth = Dimensions.get('window').width;

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

  const newSongsItem = ({ item }: any) => (
    <View style={styles.songContainer}>
      {/* <Image source={{ uri: item.image }} style={styles.songImage} />
      <View style={styles.songDetails}>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.addedBy}>Added by: {item.addedBy}</Text>
      </View> */}
      <MusicButton
        image={{ uri: item.image }}
        text={item.title}
        onPress={handleNewSong}
      />
    </View>

  );

  const renderPlaylistItem: React.FC<{ item: Playlist }> = ({ item }) => (
    <View style={styles.playlistContainer}>
      <PlaylistItem
        image={{ uri: item.image }}
        title={item.title}
        containerStyle={{ backgroundColor: 'black', borderRadius: 10, height: 50, width: (screenWidth / 2) - 25, marginRight: 10 }}
        titleStyle={{ fontSize: 12, color: 'white' }}
        onPress={handlePlaylist}
      />
    </View>
  );

  const keyExtractor = (item: Playlist) => item.id.toString();

  const groupedPlaylists: Playlist[][] = [];
  for (let i = 0; i < playlists.length; i += 2) {
    groupedPlaylists.push(playlists.slice(i, i + 2));
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Welcome, Jean</Text>
        {/* <Button title="Sign Out" onPress={handleAddSong} /> */}
        {/* <View style={styles.playlist}>
          <PlaylistItem
            image={require('../assets/Icons/Liked_sound.png')}
            title="Liked sounds"
            containerStyle={{ backgroundColor: 'black', borderRadius: 10, height: 50, width: (screenWidth / 2) - 25 }}
            titleStyle={{ fontSize: 12, color: 'white' }}
            onPress={handlePlaylist}
          />
          <PlaylistItem
            image={require('../assets/Icons/Goofy.png')}
            title="Goofy"
            containerStyle={{ backgroundColor: 'black', borderRadius: 10, height: 50, width: (screenWidth / 2) - 25 }}
            titleStyle={{ fontSize: 12, color: 'white' }}
            onPress={handlePlaylist}
          // Propriétés pour le deuxième PlaylistItem
          />
        </View> */}
        <View>
          <FlatList
            data={playlists}
            renderItem={renderPlaylistItem}
            keyExtractor={keyExtractor}
            numColumns={2}
          />
        </View>
        <View style={styles.horizontal}>
          <Text style={styles.title2}>Recently played</Text>
          <FlatList
            data={newSongs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={newSongsItem}
            horizontal={true}
            contentContainerStyle={{ flexGrow: 1, alignSelf: 'flex-end' }}
          />
        </View>
        <Text style={styles.title2}>Made for you</Text>
        <FlatList
          data={newSongs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={newSongsItem}
          horizontal={true}
          contentContainerStyle={{ flexGrow: 1, alignSelf: 'flex-end' }}
        />
        <Text style={styles.title2}>Popular</Text>
        <FlatList
          data={newSongs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={newSongsItem}
          horizontal={true}
          contentContainerStyle={{ flexGrow: 1, alignSelf: 'flex-end' }}
        />
        <Text style={styles.title}>Popular</Text>



        {/* <FlatList
        data={songs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={1}
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
      </Modal> */}
      </ScrollView>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    overflow: 'hidden',
    paddingVertical: 10,
    paddingLeft: 20
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

  },
  playlist: {
    flexDirection: 'row', // Alignement horizontal
    justifyContent: 'space-between', // Espacement équitable entre les éléments

  },
  playlistContainer: {
    flexDirection: 'row', // Alignement horizontal
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10
  },
  image: {
    width: 120,
    height: 120
  },
  horizontal: {
    flex: 1,
    marginLeft: 'auto', // Pour aligner à droite
  }
});

export default Home