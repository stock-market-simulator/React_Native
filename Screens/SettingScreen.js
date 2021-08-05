
import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import kakaoHelper from "./KakaoHelper.js";

//import {KakaoLogins,KakaoOAuthToken,KakaoProfile, KAKAO_AUTH_TYPES } from '@react-native-seoul/kakao-login';
import { KakaoOAuthToken, KakaoProfile, getProfile as getKakaoProfile, login, logout } from "@react-native-seoul/kakao-login";


class SettingScreen extends Component {
  render() {
    const signInWithKakao = async (): Promise<void> => {
      const token: KakaoOAuthToken = await login();
    
      setResult(JSON.stringify(token));
    };
    
    const signOutWithKakao = async (): Promise<void> => {
      const message = await logout();
    
      setResult(message);
    };
    
    const getProfile = async (): Promise<void> => {
      const profile: KakaoProfile = await getKakaoProfile();
    
      setResult(JSON.stringify(profile));
    };
    
    const unlinkKakao = async (): Promise<void> => {
      const message = await unlink();
    
      setResult(message);
    };
    return (
      <View style={styles.container}>
      <Text style={styles.mainTitle}>설정</Text>
        <View style={styles.boxContainer}>
          <View style={styles.contentContainer}>
            <View>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>자산 초기화</Text>
              </TouchableOpacity>
              <View style={styles.divLine} />
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>관심종목 초기화</Text>
              </TouchableOpacity>
              <View style={styles.divLine} />
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>개발자 정보</Text>
              </TouchableOpacity>
              <View style={styles.divLine} />
              <TouchableOpacity style={styles.btn} onPress={() => {
              }}>
                <Text style={styles.btnText}>@asd로그아웃</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={{}} onPress={() => {
            KakaoLogins.login().then(result => {
              console.log(`### Login Result : ${JSON.stringify(result)}`);
              KakaoLogins.getProfile().then(result => {
                  console.log(`### Profile Result : ${JSON.stringify(result)}`);
                  return result;
              }).catch(err => {
                  console.log(`### Profile Error : ${JSON.stringify(err)}`);
              });
          }).catch(err => {
              console.log(`### Login Error : ${JSON.stringify(err)}`);
          });
              }}>
                <Image source={require("../Assets/kakao_login_large_wide.png")} style={{width:"auto", resizeMode:"contain", marginHorizontal:15}}></Image>
              </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  mainTitle: {
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 36,
    marginTop: 30,
  },
  boxContainer: {
    flex: 1,
  },
  contentTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  contentContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,

    //border-android
    elevation: 3,
    //border-ios
    shadowColor: "rgb(50, 50, 50)",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      height: -1,
      width: 0,
    },
  },
  btn: {
    paddingVertical: 10
  },
  btnText: {
    fontSize: 20
  },
  divLine: {
    height: 2,
    backgroundColor: '#c4c4c4' 
  }
});

export default SettingScreen;