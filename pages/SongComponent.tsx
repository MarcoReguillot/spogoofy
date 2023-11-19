import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, FlatList, Image, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../Navigation';
import { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_STORAGE, FirebaseSong } from '../FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { Audio } from "expo-av";

interface Song {
    id: string;
    title: string;
    image: string;
    addedBy: string;
    song: string;
}

interface Props {
    song: Song;
    playSong: (song: Song) => Promise<void>;
    // setPlaying: (playing: boolean) => void;
}

function SongComponent({ song, playSong } : Props, ref: any) {

    const [playing, setPlaying] = useState(false);

    useImperativeHandle(ref, () => ({
        setPlaying(_playing: boolean) {
            setPlaying(_playing);
        }
    }));

    const handlePlay = async (song: any) => {
        await playSong(song);
    }

    const image = useMemo(() => <Image source={{ uri: song.image }} style={styles.songImage} />, [song.image]);

    return (
        <View style={styles.songContainer}>
          {image}
          <View style={styles.songDetails} onTouchEnd={() => handlePlay(song)}>
            <Text style={styles.songTitle}>{song.title}</Text>
            <Text style={styles.addedBy}>Added by: {song.addedBy} {playing && " - playing"}</Text>
          </View>
        </View>
    )
}


const styles = StyleSheet.create({
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

export default forwardRef(SongComponent);