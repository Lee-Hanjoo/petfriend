import React, { useEffect } from "react";
import { Button, Dimensions, Image, Pressable, StyleSheet, Text } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { ImgPath } from "../ImgPath";

WebBrowser.maybeCompleteAuthSession();

const {width, height} = Dimensions.get('window')

export default function AuthGoogle() {

 const [request, response, promptAsync] = Google.useAuthRequest({
  expoClientId: "b84d268c-dd17-4b4d-a346-d93eefdc4f9f.apps.googleusercontent.com",
  androidClientId: "113082507641007466846.apps.googleusercontent.com",
  iosClientId: "838974498419-r6srtcuduo6l4sohf3rvf200jqb1kmr6.apps.googleusercontent.com",
  redirectUri: "http://localhost:8081/api/auth/callback/google",
 });

 useEffect(() => {
  if (response?.type === "success") {
   const { authentication } = response;
   console.log("AccessToken: ", authentication?.accessToken);
  }
 }, [response]);

 return (
  <Pressable 
    style={[
      styles.snsBtn, 
      {borderWidth: 1, 
      borderColor: '#8D96A4'
    }]}
    disabled={!request}
    onPress={() => promptAsync()}
    >
    <Image source={ImgPath.google} style={[styles.snsBtnImg, {width: 24, height: 24}]}/>
    <Text style={[styles.snsBtnText]}>구글로 계속하기</Text>
  </Pressable>
 );
}


const styles = StyleSheet.create({
snsBtn: {
  width: width - 40,
  paddingVertical: 16,
  borderRadius: 6,
},
snsBtnText: {
  fontWeight: '500',
  color: '#1F2329',
  textAlign: 'center',
},
snsBtnImg: {
  position: 'absolute',
  left: 20,
  top: 12
},
})