import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, Image, Alert, StyleSheet } from 'react-native';
import { RootStackParamList } from '../Navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_DB } from '../FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import CustomInputs from './CustomInputs';
import { CustomButtons, ImageButton } from './CustomButtons';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (loading) return;
    if (email === '' || password === '' || username === '') {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((creds) => addDoc(collection(FIREBASE_DB, 'users'), {
        username,
        uid: creds.user.uid,
      }))
      .then((creds) => {
        console.log(creds)
        Alert.alert('Success', `Logged in as ${email}`);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <ImageButton
        onPress={() => navigation.navigate("Login")}
        text="Sign Up"
        imageSource={require('../assets/Icons/left-arrow.png')}
      />
      {/* <Text style={styles.title}> Sign Up</Text> */}
      <Image
        source={require('../assets/Icons/Spogoofy_all_logo.png')} // Assurez-vous de remplacer le chemin par le chemin réel de votre image
        style={styles.image}
      />
      <CustomInputs
        value={username}
        setValue={setUsername}
        placeholder="Enter your name"
        securityTextEntry={false}
        title="Name"
      />
      <CustomInputs
        value={email}
        setValue={setEmail}
        placeholder="Enter your e-mail"
        securityTextEntry={false}
        title="Email"
      />
      <CustomInputs
        value={password}
        setValue={setPassword}
        placeholder="Enter your password"
        securityTextEntry={true}
        title="Password"
      />
      <Text style={styles.info}>Must be at least 8 characters</Text>
      <CustomButtons
        text={"Create an account"}
        onPressed={handleLogin}
        type={"PRIMARY"}
      />
      <Text style={styles.text}>Already have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>Log In</Text>
      </Text>
      {/* <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
    // marginHorizontal: 20
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  info: {
    fontSize: 12,
    color: "gray",
  },
  text: {
    color: "gray",
    marginVertical: 20,
    textAlign: 'center',
  },
  link: {
    color: "#64C3EA"
  },
  image: {
    marginVertical: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginHorizontal: 20,
  }
});