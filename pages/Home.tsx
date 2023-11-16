import React, { useState } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet, PermissionsAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { getDocumentAsync } from 'expo-document-picker';
import { FIREBASE_STORAGE } from '../FirebaseConfig';
import { StorageReference, ref, uploadBytes } from 'firebase/storage';
import { randomUUID } from "expo-crypto"
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

async function uploadToFirebase(src: string, dest: string) {
  const reference = ref(FIREBASE_STORAGE, dest);
  const fetchResponse = await fetch(src)
  const blob = await fetchResponse.blob()
  return await uploadBytes(reference, blob);
}

export default function Home() {
  const [uploading, setUploading] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [songUri, setSongUri] = useState<string | null>(null);
  const handleAddImage = async () => {
    try {
      // const granted = await PermissionsAndroid.requestMultiple([
      //   PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      // ]);

      // if (granted['android.permission.READ_EXTERNAL_STORAGE'] === 'granted') {
        const result = await launchImageLibraryAsync({
          mediaTypes: MediaTypeOptions.Images,
        });

        if (!result.canceled) {
          console.log("songUri", result);
          setImageUri(result.assets[0].uri);
          alert('Song uploaded successfully!');
        }
      // }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = async () => {
    if (!imageUri) {
      alert('Please select an image first');
      return;
    }
    if (!songUri) {
      alert('Please select a song first');
      return;
    }
    if (uploading) return;

    const songUUID = "aze"

    await uploadToFirebase(imageUri, "images/" + songUUID);
    console.log("hahah")
    await uploadToFirebase(songUri, "songs/" + songUUID);
    console.log("hahi")
    alert('Upload successful!');
  }

  const handleAddSong = async () => {
    getDocumentAsync({
      type: "audio/*",
    }).then((result) => {
      if (result.canceled) return;
      setSongUri(result.assets[0].uri);
      alert('Song uploaded successfully!');
    }).catch((error) => {
      alert('Error uploading song');
      console.error(error);
    })
  };

  const renderItem = ({ item }: any) => (
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
      <Button title="Add Image" onPress={handleAddImage} />
      <Button title="Add Song" onPress={handleAddSong} />
      <Button title="Upload" onPress={handleUpload} />
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
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