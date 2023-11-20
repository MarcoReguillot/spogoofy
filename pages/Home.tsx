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
    title: 'damnnnn',
    image: 'https://us-tuna-sounds-images.voicemod.net/bf7cc066-fc4b-4bd7-8ee8-d96876dc0077-1666364305698.jpg', // Example image URL
  },
  {
    id: 2,
    title: 'drip bob',
    image: 'https://assets.puzzlefactory.com/puzzle/237/551/original.jpg', // Example image URL
  },
  {
    id: 3,
    title: 'Blue smurf',
    image: 'https://i.ytimg.com/vi/seaHqIMTECo/maxresdefault.jpg', // Example image URL
  },


];

const newSongs2 = [
  {
    id: 1,
    title: 'Salut c ninho',
    image: 'https://cdn.discordapp.com/attachments/1139258191503433730/1176128882127147018/Zys9d2dbc3_9ho4x.png?ex=656dbe60&is=655b4960&hm=d8928a59375729fea08bb51ef928b9cf7ce3516d52cfbfb9e8fb385d4e0c6527&', // Example image URL
  },
  {
    id: 2,
    title: 'Jaune atan',
    image: 'https://www.madmoizelle.com/wp-content/uploads/2017/07/jaune-et-qui-attend-youtube.jpg', // Example image URL
  },
  {
    id: 3,
    title: 'pls',
    image: 'https://risibank.fr/cache/medias/0/1/191/19132/full.png', // Example image URL
  },


];

const newSongs3 = [
  {
    id: 1,
    title: 'macronnnnnnnnn',
    image: 'https://images3.memedroid.com/images/UPLOADED391/5f859d50e0601.jpeg', // Example image URL
  },
  {
    id: 2,
    title: 'Ta maman',
    image: 'https://pbs.twimg.com/profile_images/1303090872553267205/EMnypojd_400x400.jpg', // Example image URL
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
        <View style={styles.playlist}>
          <PlaylistItem
            image={require('../assets/Icons/Liked_sound.png')}
            title="Liked sounds"
            containerStyle={{ backgroundColor: 'black', borderRadius: 10, height: 50, width: (screenWidth / 2) - 25 }}
            titleStyle={{ fontSize: 12, color: 'white' }}
            imageStyle={{ borderRadius: 10 }}
            onPress={handlePlaylist}
          />
          <PlaylistItem
            image={require('../assets/Icons/Goofy.png')}
            title="Goofy"
            containerStyle={{ backgroundColor: 'black', borderRadius: 10, height: 50, width: (screenWidth / 2) - 25 }}
            titleStyle={{ fontSize: 12, color: 'white' }}
            onPress={handlePlaylist}
            imageStyle={{ borderRadius: 10 }}
          // Propriétés pour le deuxième PlaylistItem
          />
        </View>
        <View>
          {/* <FlatList
            data={playlists}
            renderItem={renderPlaylistItem}
            keyExtractor={keyExtractor}
            numColumns={2}
          /> */}
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
          data={newSongs2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={newSongsItem}
          horizontal={true}
          contentContainerStyle={{ flexGrow: 1, alignSelf: 'flex-end' }}
        />
        <Text style={styles.title2}>Popular</Text>
        <FlatList
          data={newSongs3}
          keyExtractor={(item) => item.id.toString()}
          renderItem={newSongsItem}
          horizontal={true}
          contentContainerStyle={{ flexGrow: 1, alignSelf: 'flex-end' }}
        />

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