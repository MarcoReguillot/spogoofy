import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';


import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './pages/NavBar';
import { StyleSheet, View } from 'react-native';

import SongList from './pages/SongList';
import Upload from './pages/Upload';
import Search from './pages/Search';
import Home from './pages/Home';
import Playlist from './pages/Playlist';
import Profile from './pages/Profile';
import MusicScreen from './pages/MusicScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  NavBar: undefined;
  SongList: undefined;
  Upload: undefined;
  Home: undefined;
  Search: undefined;
  Playlist: undefined;
  Profile: undefined;
  Music: undefined;
  // here put the different pages
};

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function Navigation() {
  return (
    <View style={styles.container}>
      <NavigationContainer  >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          {/* <Stack.Screen name="NavBar" component={NavBar} /> */}
          <Stack.Screen name="SongList" component={SongList} />
          <Stack.Screen name="Upload" component={Upload} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Playlist" component={Playlist} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Music" component={MusicScreen} />
        </Stack.Navigator>
        <NavBar />

      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
});