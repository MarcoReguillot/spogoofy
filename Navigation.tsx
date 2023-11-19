import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './pages/NavBar';
import { StyleSheet } from 'react-native';

import SongList from './pages/SongList';
import Upload from './pages/Upload';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  NavBar: undefined;
  SongList: undefined;
  Upload: undefined;
  // here put the different pages
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="NavBar" component={NavBar} />
        <Stack.Screen name="SongList" component={SongList} />
        <Stack.Screen name="Upload" component={Upload} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}