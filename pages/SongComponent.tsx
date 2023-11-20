import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, FlatList, Image, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../Navigation';
import { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_STORAGE, FirebaseSong } from '../FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { Audio } from "expo-av";
import VisibilitySensor from '@svanboxel/visibility-sensor-react-native';

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
  image: string;
  // setPlaying: (playing: boolean) => void;
}

function SongComponent({ song, playSong, image }: Props, _ref: any) {

  const [playing, setPlaying] = useState(false);

  useImperativeHandle(_ref, () => ({
    setPlaying(_playing: boolean) {
      setPlaying(_playing);
    }
  }));

  const [imageUri, setImageUri] = useState<string | undefined>(undefined);

  const handlePlay = async (song: any) => {
    await playSong(song);
  }

  const handleImageVisibility = (isVisible: boolean) => {
    if (imageUri) return;
    if (isVisible) {
      console.log('visible', isVisible);
      const imageRef = ref(FIREBASE_STORAGE, `images/${song.id}`);    
      getDownloadURL(imageRef).then((url) => {
        setImageUri(url);
      })
    }
  }

  const _image = useMemo(() => <Image source={{ uri: imageUri }} style={styles.songImage} />, [imageUri]);

  return (
      <VisibilitySensor onChange={handleImageVisibility} style={styles.songContainer}>
      {_image}
      <View style={styles.songDetails} onTouchEnd={() => handlePlay(song)}>
        <Text style={styles.songTitle}>{song.title}</Text>
        <Text style={styles.addedBy}>Added by: {song.addedBy} {playing && " - playing"}</Text>
      </View>
      </VisibilitySensor>
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
    borderRadius: 10,
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