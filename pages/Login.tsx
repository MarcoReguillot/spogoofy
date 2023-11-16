import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View, Image, Alert, StyleSheet, Text } from 'react-native';
import { RootStackParamList } from '../Navigation';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import CustomInputs from './CustomInputs';
import CustomButtons from './CustomButtons';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation }: Props) {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    FIREBASE_AUTH.onAuthStateChanged((user) => {
      if (user) {
        console.log('user logged')
        navigation.navigate('Home')
      } else {
        console.log('user not logged')
      }
    });
  }, []);

  const handleLogin = () => {
    if (loading) return;
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    setLoading(true);
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((userCredential) => {
        Alert.alert('Success', `Logged in as ${userCredential.user.email}`);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false);
      });
  };

  const forgotPassword = () => {
    //confirmation
    // navigation.navigate("ForgotPasswordScreen");
    // print("oui");
    console.log('Button Pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Log in to an account</Text>
      {/* <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      /> */}
      <Image
        source={require('../assets/Icons/Spogoofy_all_logo.png')} // Assurez-vous de remplacer le chemin par le chemin réel de votre image
        style={styles.image}
      />
      <CustomInputs
        value={email}
        setValue={setEmail}
        placeholder="Enter your e-mail"
        securityTextEntry={true}
        title="Email"
      />

      <CustomInputs
        value={password}
        setValue={setPassword}
        placeholder="Enter your password"
        securityTextEntry={true}
        title="Password"
      />
      <CustomButtons
        text={"Forgot Password?"}
        onPressed={forgotPassword}
        type={"TERCIARY"}
      />
      <CustomButtons
        text={"Log In"}
        onPressed={handleLogin}
        type={"PRIMARY"}
      />
      {/* <CustomButtons
        text={"Log In"}
        onPressed={handleLogin}
        type={"PRIMARY"}
      /> */}
      <Text style={styles.text}>Doesn't have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate("Register")}>Sign Up</Text>
      </Text>
      {/* <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      /> */}
      {/* <Button title="Login" onPress={handleLogin} />
      <Button title="Go to Register" onPress={() => navigation.navigate("Register")} /> */}
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
  text: {
    color: "gray",
    marginVertical: 20,
    textAlign: 'center',
  },
  link: {
    color: "#64C3EA"
  },
  image: {
    marginVertical: 90,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
  }
});