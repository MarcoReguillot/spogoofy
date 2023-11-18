import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, FlatList, Image, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../Navigation';
import { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_STORAGE, FirebaseSong } from '../FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
const songs = [
  {
    id: 1,
    title: 'Song 1',
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

interface Song {
  id: string;
  title: string;
  image: string;
  addedBy: string;
}


async function getSongList() {
  const songCollection = collection(FIREBASE_DB, 'songs');
  const songSnapshot = await getDocs(songCollection);
  const songs: FirebaseSong[] = songSnapshot.docs.map(doc => ({...doc.data(), id: doc.id } as FirebaseSong));
  console.log(songs);

  const userIds = songs.map(song => song.uploadedBy);
  const userCollection = collection(FIREBASE_DB, 'users');
  const userSnapshot = await getDocs(query(userCollection, where('uid', 'in', userIds)));

  var songsWithUser: Song[] = songs.map(song => ({
    id: song.id,
    title: song.title,
    addedBy: userSnapshot.docs.find(doc => doc.data().uid === song.uploadedBy)?.data().username,
    image: ''
  }));

  for (let i of songsWithUser) {
    const imageRef = ref(FIREBASE_STORAGE, `images/${i.id}`);
    const imageUrl = await getDownloadURL(imageRef);
    i.image = imageUrl;
  }

  return songsWithUser;
}

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Home({ navigation }: Props)
{
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    getSongList().then(setSongs)
  }, [])

  const renderItem = ({ item }: {item:  Song}) => (
    <View style={styles.songContainer}>
      <Image source={{ uri: item.image }} style={styles.songImage} />
      <View style={styles.songDetails}>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.addedBy}>Added by: {item.addedBy}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <Button title="Go to upload"
        onPress={() => navigation.navigate("Upload") }
      />
      <Button title="Logout" onPress={() => FIREBASE_AUTH.signOut()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
});