
import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const Stack = createStackNavigator();

function InfoStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Info" component={InfoScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

function InfoScreen() {
  const userInfo = {
    TA: 10100000,
    AA: 9150000,
    SA: 950000, //원래는 보유주식 총액으로 계산해야 하지만 일단 임의의 값 사용
    PP: 10000000,
  }; //서버에서 받아올 데이터
  const TA = userInfo.TA.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //자릿수 나누기
  const AA = userInfo.AA.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //자릿수 나누기
  const SA = userInfo.SA.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //자릿수 나누기
  const TR = (userInfo.TA - userInfo.PP).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //자릿수 나누기
  const PR = ((userInfo.TA - userInfo.PP) / userInfo.TA).toFixed(2); //자릿수 나누기

  const userStock = [
    {
      name: "삼성전자",
      avrgPrice: 85000,
      quantity: 10,
      nowPrice: 95000
    },
    {
      name: "stock22",
      avrgPrice: 75000,
      quantity: 30,
      nowPrice: 100000
    },
  ]; //서버에서 받아올 데이터

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>내 정보</Text>
      <View style={[styles.contentContainer, { padding: 15 }]}>
        <Text style={styles.contentTitle}>총 자산</Text>
        <Text style={styles.totalAsset}>{TA}</Text>
        <View style={styles.infoLine}>
          <Text style={styles.infoName}>가용 자산</Text>
          <Text style={styles.infoValue}>{AA}</Text>
        </View>
        <View style={styles.infoLine}>
          <Text style={styles.infoName}>보유 주식</Text>
          <Text style={styles.infoValue}>{SA}</Text>
          <Text style={[styles.infoValue,{color: "#e74c3c"}]}> (+0.?%)</Text>
        </View>
      </View>
      <Text style={styles.boxTitle}>총 수익</Text>
      <View style={[styles.contentContainer, { backgroundColor: "#f7cb84", height: 100, justifyContent: "center" }]}>
        <Text style={{ alignSelf: "center", fontSize: 36, color: "white", fontWeight: "bold" }}>+{TR}</Text>
        <Text style={{ alignSelf: "center", fontSize: 18, color: "white", fontWeight: "bold" }}>(+{PR}%)</Text>
      </View>
      <Text style={styles.boxTitle}>보유 종목</Text>
      <ScrollView style={styles.boxContainer}>

        {/*보유 주식 목록 생성*/}
        {userStock.map((obj, index) => {
          const AP = obj.avrgPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //자릿수 나누기
          const TP = (obj.quantity * obj.nowPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //자릿수 나누기
          const PR = ((obj.nowPrice - obj.avrgPrice) / obj.nowPrice).toFixed(2);

          return (
            <View key={index} style={[styles.contentContainer, { marginVertical: 10, padding: 15 }]}>
              <Text style={styles.contentTitle}>{obj.name}</Text>
              <View style={styles.infoLine}>
                <Text style={styles.infoName}>평균 구매가</Text>
                <Text style={styles.infoValue}>{AP}</Text>
              </View>
              <View style={styles.infoLine}>
                <Text style={styles.infoName}>수량</Text>
                <Text style={styles.infoValue}>{obj.quantity}</Text>
              </View>
              <View style={styles.infoLine}>
                <Text style={styles.infoName}>현재 총액</Text>
                <Text style={styles.infoValue}>{TP} </Text>
                {PR > 0 ? <Text style={[styles.infoValue,{color:"#e74c3c"}]}>(+{PR}%)</Text> : <Text style={[styles.infoValue,{color:"#3498db"}]}>(-{PR}%)</Text>}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
function LoginScreen() {
  return (
    <View style={styles.container}>
      <View style={[styles.boxContainer, styles.alignCenter]}>
        <Feather name={"user"} size={100} color={"#3498db"} />
        <View style={[styles.inputBox,{ marginTop: 50 }]}>
          <View style={[styles.alignCenter, styles.iconBack]}>
            <Icon name={"user"} size={20} color={"gray"}></Icon>
          </View>
          <TextInput style={styles.textInput} placeholder="Username" onChangeText={(id) => {
            //ID 입력
          }} />
        </View>
        <View style={[styles.inputBox,{ marginTop: 10 }]}>
          <View style={[styles.alignCenter, styles.iconBack]}>
            <Icon name={"key"} size={20} color={"gray"}></Icon>
          </View>
          <TextInput style={styles.textInput} placeholder="Password" secureTextEntry={true} onChangeText={(password) => {
            //PW 입력
          }} />
        </View>
        <TouchableOpacity style={[styles.btn, styles.alignCenter, { marginTop: 50, backgroundColor: "#3498db" }]}>
          <Text style={{ color: "white", fontSize: 18 }}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.alignCenter, { marginTop: 20, backgroundColor: "lightgray" }]}>
          <Text style={{ color: "black", fontSize: 18 }}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  topSearchBar: {
    height: 40,
    margin: 20,
    alignItems: 'flex-end',
  },
  boxContainer: {
    flex: 1,
  },
  mainTitle: {
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 36,
    marginTop: 30,
  },
  boxTitle: {
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 26,
  },
  contentTitle: {
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 20,
  },
  totalAsset: {
    fontSize: 20,
    marginBottom: 10
  },
  infoLine: {
    flexDirection: "row"
  },
  infoName: {
    fontSize: 16,
    fontWeight: "bold",
    width: 90
  },
  infoValue: {
    fontSize: 16,
    color: "black",
  },
  contentContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,

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
  
  inputBox: {
    backgroundColor: 'white',
    width: "60%",
    height: 40,
    borderRadius: 5,
    borderColor: "lightgray",
    borderWidth: 1,
    flexDirection: "row",

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
  iconBack: {
    width: 40,
    backgroundColor: "lightgray"
  },
  textInput: {
    flex: 1,
    fontSize: 18
  },

  btn: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: "60%",
    height: 40,
    borderRadius: 5,

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

  alignCenter: {
    alignItems:"center",
    justifyContent:"center",
  }
});

export default InfoStackScreen;