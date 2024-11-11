import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const validateInput = (memInfo) => {
      const {username, email, password, confirmPassword} = memInfo;
      if (!username || !email || !password || !confirmPassword) {
      Alert.alert('필수', '모든 내용을 채워주세요');
      return false;
      }
      if (password !== confirmPassword) {
      Alert.alert('비밀번호 오류', '패스워드가 일치하지 않습니다.');
      return false;
      }
      // 필요시 추가 유효성 검사
      return true;
};

export const saveAuthToken = async (info,setSession) => {
      const {username, password} = info;
      try {
        const response = await axios.post('exp://192.168.94.228:8081/member/login', { username, password });
        if (response.status === 200) {
          const { accessToken, refreshToken } = response.data;
     
          await AsyncStorage.setItem('@user', accessToken);
          await AsyncStorage.setItem('refresh_token', refreshToken);
          setSession(accessToken)
        }
      } catch (error) {
        throw new Error('Invalid credentials');
      }
};

export const handleSignUp = async (navigation,memInfo,setSession) => {
      if (!validateInput(memInfo)) return;
   
      try {
        await addDoc(collection(db,'member'),memInfo); 
        await saveAuthToken(memInfo, setSession);
        Alert.alert('회원가입 성공', `환영합니다!`,[{
          onPress :()=>{
            navigation.reset({index:0,routes:[{ name: '홈' }]}); 
          }
        }]);      
      } catch (error) {
        Alert.alert('회원가입 실패', '문제가 발생했습니다');
      }
};

export const handleLogin = async (navigation,userInfo, setSession) => {
      try {       
        await saveAuthToken(userInfo, setSession); 
        Alert.alert('로그인 성공', `환영합니다!`,[{
          onPress :()=>{
            navigation.reset({index:0,routes:[{ name: '홈' }]}); 
          }
        }]);
       
      } catch (error) {
        Alert.alert('로그인 실패', '아이디 또는 비밀번호가 잘못되었습니다');
      }
};

export const handleLogout = async (setSession) => {
      try {
        await AsyncStorage.removeItem('@user');
        await AsyncStorage.removeItem('refresh_token');
        setSession(null);
        Alert.alert('Logout');
      } catch (error) {
        Alert.alert('Error');
      }
};