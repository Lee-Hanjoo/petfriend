import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { handleSignUp } from '../lib/member';
import { SessionContext } from '../MenuProvider';

export default function MemberJoin({navigation}) {

 const {session, setSession} = useContext(SessionContext)
 const [username, setName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');

 return (
  <View style={styles.container}>
   <Text style={styles.title}>Sign Up</Text>

   <TextInput
    style={styles.input}
    placeholder="Name"
    value={username}
    onChangeText={(text) => setName(text)}
   />

   <TextInput
    style={styles.input}
    placeholder="Email"
    value={email}
    onChangeText={(text) => setEmail(text)}
    keyboardType="email-address"
   />

   <TextInput
    style={styles.input}
    placeholder="Password"
    value={password}
    onChangeText={(text) => setPassword(text)}
    secureTextEntry={true}
   />

   <TextInput
    style={styles.input}
    placeholder="Confirm Password"
    value={confirmPassword}
    onChangeText={(text) => setConfirmPassword(text)}
    secureTextEntry={true}
   />

   <Button title="Sign Up" onPress={()=>handleSignUp(navigation,{username,email,password,confirmPassword},setSession)} />
   <Text style={styles.link}>Already have an account? Login</Text>
  </View>
 );
}

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
