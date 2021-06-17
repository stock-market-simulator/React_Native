
import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

function SettingScreen({ navigation }) {
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
              navigation.navigate('Login');
            }}>
              <Text style={styles.btnText}>로그아웃</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>

  );
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