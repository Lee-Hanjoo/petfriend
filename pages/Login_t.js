import { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { handleLogin, handleLogout } from '../lib/member';
import { useMenu } from '../MenuProvider';

import AuthGoogle from '../component/AuthGoogle';

const Login = ({navigation}) => {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');

 const {session, setSession} = useMenu()

 return (
  <View style={styles.container}>
   {session ? (
    <View>
     <Button title="Logout" onPress={()=>{handleLogout(setSession)}} />
    </View>
   ) : (
    <>
     <Text style={styles.title}>Login</Text>
     <TextInput
      style={styles.input}
      placeholder="Username"
      value={username}
      onChangeText={(text) => setUsername(text)}
     />
     <TextInput
      style={styles.input}
      placeholder="Password"
      value={password}
      onChangeText={(text) => setPassword(text)}
      secureTextEntry={true}
     />
     <Button title="Login" onPress={()=>handleLogin(navigation,{username,password},setSession)} />
    </>
   )}

   <Text style={styles.link}>Don't have an account? Sign Up</Text>

   <AuthGoogle/>

  </View>
 );
};

export default Login;

const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: 'center',
  padding: 16,
 },
 title: {
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 20,
 },
 input: {
  height: 40,
  borderColor: 'gray',
  borderWidth: 1,
  marginBottom: 12,
  paddingLeft: 8,
  borderRadius: 4,
 },
 link: {
  textAlign: 'center',
  marginTop: 16,
  color: 'blue',
  textDecorationLine: 'underline',
 },
});