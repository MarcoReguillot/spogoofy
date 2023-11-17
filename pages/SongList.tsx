import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, FlatList, Image, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../Navigation';
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

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Home({ navigation }: Props) {
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
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <Button title="Go to upload"
        onPress={() => navigation.navigate("Upload") }
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