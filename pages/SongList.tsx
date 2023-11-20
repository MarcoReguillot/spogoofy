import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, TouchableOpacity, Text, FlatList, Image, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../Navigation';
import { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_STORAGE, FirebaseSong } from '../FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { MutableRefObject, RefObject, useEffect, useRef, useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { Audio } from "expo-av";
import SongComponent from './SongComponent';
import { SongItem } from './CustomButtons';

interface Song {
  id: string;
  title: string;
  image: string;
  addedBy: string;
  song: string;
}

async function getSongList() {
  const songCollection = collection(FIREBASE_DB, 'songs');
  const songSnapshot = await getDocs(songCollection);
  const songs: FirebaseSong[] = songSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as FirebaseSong));
  console.log(songs);

  const userIds = songs.map(song => song.uploadedBy);
  const userCollection = collection(FIREBASE_DB, 'users');
  const userSnapshot = await getDocs(query(userCollection, where('uid', 'in', userIds)));

  var songsWithUser: Song[] = songs.map(song => ({
    id: song.id,
    title: song.title,
    addedBy: userSnapshot.docs.find(doc => doc.data().uid === song.uploadedBy)?.data().username,
    image: '',
    song: '',
  }));

  for (let i of songsWithUser) {
    const imageRef = ref(FIREBASE_STORAGE, `images/${i.id}`);
    i.image = await getDownloadURL(imageRef);

    const songRef = ref(FIREBASE_STORAGE, `songs/${i.id}`);
    i.song = await getDownloadURL(songRef);
  }

  return songsWithUser;
}

async function playSong(song: Song) {
  const soundObject = new Audio.Sound();
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    playsInSilentModeIOS: true,
    staysActiveInBackground: true,
    shouldDuckAndroid: true,
  });

  try {
    await soundObject.loadAsync({ uri: song.song });
    const status = await soundObject.getStatusAsync();
    console.log(status);
    await soundObject.playAsync();
    var songEndPromise = new Promise((resolve, reject) => {
      soundObject.setOnPlaybackStatusUpdate(async (status) => {
        if ((status as any).didJustFinish) {
          resolve(true);
        }
      });
    });

    await songEndPromise;
    // wait till song play end
    //console.log("c")
    //await soundObject.unloadAsync();
  } catch (error) {
    console.log(error);
  }
}

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

function shuffleArray(len: number) {
  let array = Array.from({ length: len }, (_, index) => index);

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

interface LectureState {
  currentSong: number;
  lectureList: number[];
  currentSongAudio: Audio.Sound;
  nextSongAudio: Audio.Sound | null;
  nextSongLoadedPromise: Promise<any>;
}

export default function Home({ navigation }: Props) {
  const [songs, setSongs] = useState<Song[]>([]);
  const songRefs: MutableRefObject<MutableRefObject<any>[]> = useRef([]);
  const lectureState = useRef<LectureState>({
    lectureList: [],
    currentSong: 0,
    currentSongAudio: new Audio.Sound(),
    nextSongAudio: null,
    nextSongLoadedPromise: new Promise(() => { }),
  });
  const started = useRef(false);

  useEffect(() => {
    getSongList().then((_songs) => {
      console.log(_songs);
      songRefs.current = [];
      for (let i in _songs) {
        songRefs.current.push(React.createRef());
      }
      lectureState.current.lectureList = shuffleArray(_songs.length);
      setSongs(_songs);
    })
  }, [])

  const songLoop = async () => {

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
    });

    while (true) {
      // find next song
      console.log("find next song")
      let currentSongIndex = lectureState.current.lectureList[lectureState.current.currentSong];
      let nextSongIndex = lectureState.current.lectureList[(lectureState.current.currentSong + 1) % lectureState.current.lectureList.length];
      console.log("next song = ", nextSongIndex)
      // change state of the song
      console.log("change state of the song")
      await songRefs.current[currentSongIndex].current.setPlaying(true);

      // unload last played song
      console.log("unload last played song")
      await lectureState.current.currentSongAudio.unloadAsync();

      if (!lectureState.current.nextSongAudio) {
        lectureState.current.nextSongAudio = new Audio.Sound();
        lectureState.current.nextSongLoadedPromise = lectureState.current.nextSongAudio.loadAsync({ uri: songs[currentSongIndex].song });
      }
      // wait for the next song (that will be the current to finish loading)
      console.log("wait for the next song (that will be the current to finish loading)")
      await lectureState.current.nextSongLoadedPromise;

      // put nextSong at current song
      console.log("put nextSong at current song")
      lectureState.current.currentSongAudio = lectureState.current.nextSongAudio;

      // play current song
      console.log("play current song")
      await lectureState.current.currentSongAudio.playAsync();

      // load next song
      console.log("load next song")
      lectureState.current.nextSongAudio = new Audio.Sound();
      lectureState.current.nextSongLoadedPromise = lectureState.current.nextSongAudio.loadAsync({ uri: songs[nextSongIndex].song });

      await new Promise((resolve, reject) => {
        lectureState.current.currentSongAudio.setOnPlaybackStatusUpdate(async (status) => {
          if ((status as any).didJustFinish) {
            resolve(true);
          }
        });
      });
      await songRefs.current[currentSongIndex].current.setPlaying(false);
      lectureState.current.currentSong += 1;
      if (lectureState.current.currentSong >= lectureState.current.lectureList.length) {
        lectureState.current.currentSong = 0;
      }
    }
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
        onPress={() => {
          if (!started.current) {
            songLoop();
            started.current = true;
            return;
          }
          lectureState.current.currentSongAudio.playAsync();
        }}
      />
    </View>

  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconTitle}>
        <Text style={styles.title}>Liked sounds</Text>
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={() => {
            if (!started.current) {
              songLoop();
              started.current = true;
              return;
            }
            lectureState.current.currentSongAudio.playAsync();
            // if (started.current == false) return;
          }} style={styles.buttonContainer}>
            <Image source={require("../assets/Icons/play.png")} style={styles.image} />
          </TouchableOpacity>
        </View>

      </View>
      {songs.map((song, index) => <SongComponent key={song.id} song={song} playSong={playSong} ref={songRefs.current[index]} />)}
      {/* <FlatList
        data={songs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      /> */}
      <Button title="Pause" onPress={() => {
        if (started.current == false) return;
        lectureState.current.currentSongAudio.pauseAsync();
      }} />
    </SafeAreaView >
    // <SafeAreaView style={styles.container}>
    //   <Button title="Go to upload"
    //     onPress={() => navigation.navigate("Upload")}
    //   />
    //   <Button title="Logout" onPress={() => FIREBASE_AUTH.signOut()} />
    //   <Button title="Play" onPress={() => {
    //     if (!started.current) {
    //       songLoop();
    //       started.current = true;
    //       return;
    //     }
    //     lectureState.current.currentSongAudio.playAsync();
    //   }} />
    //   
    // </SafeAreaView>
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
