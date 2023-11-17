import React, { useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { getDocumentAsync } from 'expo-document-picker';
import { FIREBASE_STORAGE } from '../FirebaseConfig';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { randomUUID } from "expo-crypto"

async function uploadToFirebase(src: string, dest: string) {
    const reference = ref(FIREBASE_STORAGE, dest);
    const fetchResponse = await fetch(src)
    const blob = await fetchResponse.blob()
    // https://github.com/firebase/firebase-js-sdk/issues/5848
    return await uploadBytesResumable(reference, blob);
}

export default function Upload() {
    const [loading, setLoading] = useState(false);
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [songUri, setSongUri] = useState<string | null>(null);
    const handleAddImage = async () => {
      if (loading) return;
      setLoading(true);
      try {
        // const granted = await PermissionsAndroid.requestMultiple([
        //   PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        // ]);
  
        // if (granted['android.permission.READ_EXTERNAL_STORAGE'] === 'granted') {
          const result = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.Images,
          });
  
          if (result.assets) {
            console.log("songUri", result);
            setImageUri(result.assets[0].uri);
            alert('Song uploaded successfully!');
          }
        // }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
  
    const handleUpload = async () => {
      if (loading) return;
      if (!imageUri) {
        alert('Please select an image first');
        return;
      }
      if (!songUri) {
        alert('Please select a song first');
        return;
      }
      setLoading(true)
      const songUUID = randomUUID();
  
      await uploadToFirebase(imageUri, "images/" + songUUID);
      await uploadToFirebase(songUri, "songs/" + songUUID);
      setLoading(false)
      alert('Upload successful!');
    }
  
    const handleAddSong = async () => {
      getDocumentAsync({
        type: "audio/*",
      }).then((result) => {
        if (!result.assets) return;
        setSongUri(result.assets[0].uri);
        alert('Song uploaded successfully!');
      }).catch((error) => {
        alert('Error uploading song');
        console.error(error);
      })
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <Button title="Add Image" onPress={handleAddImage} />
        <Button title="Add Song" onPress={handleAddSong} />
        <Button title="Upload" onPress={handleUpload} />
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
    }
  });