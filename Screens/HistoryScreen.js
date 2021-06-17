
import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function HistoryScreen() {
  const buyList = [
    {
      name: "삼성전자",
      price: 85000,
      quantity: 10,
    },
    {
      name: "temp",
      price: 12345,
      quantity: 12,
    },
    {
      name: "temp",
      price: 12345,
      quantity: 12,
    },
  ]; //서버에서 받아올 데이터
  const sellList = [
    {
      name: "삼성전자",
      price: 85000,
      quantity: 10,
    },
    {
      name: "temp",
      price: 12345,
      quantity: 12,
    },
    {
      name: "temp",
      price: 12345,
      quantity: 12,
    },
  ]; //서버에서 받아올 데이터

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>거래 내역</Text>

      <Text style={styles.boxTitle}>매수 진행 중</Text>
      <ScrollView style={styles.boxContainer}>

        {/*미체결 매수 목록 생성*/}
        {buyList.map((obj, index) => {
          const localeP = obj.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //자릿수 나누기
          const localeQ = obj.quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //자릿수 나누기
          const totalPrice = (obj.price * obj.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //자릿수 나누기

          return (
            <View key={index} style={styles.contentContainer}>
              <View style={styles.infoBox}>
                <Text style={styles.contentTitle}>{obj.name}</Text>
                <View style={styles.infoLine}>
                  <Text style={styles.infoName}>희망가</Text>
                  <Text style={styles.infoValue}>{localeP}</Text>
                </View>
                <View style={styles.infoLine}>
                  <Text style={styles.infoName}>수량</Text>
                  <Text style={styles.infoValue}>{localeQ}</Text>
                </View>
                <View style={styles.infoLine}>
                  <Text style={styles.infoName}>총금액</Text>
                  <Text style={styles.infoValue}>{totalPrice}</Text>
                </View>
              </View>
              <View style={styles.btnBox}>
                <TouchableOpacity onPress={() => {
                  //
                }}>
                  <Icon name={"edit"} color={"#3498db"} style={styles.btn} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  Alert.alert(
                    "매수",
                    "정말 주문을 삭제하시겠습니까?",
                    [
                      {
                        text: "YES",
                        onPress: () => { alert("주문취소") },
                      },
                      {
                        text: "NO",
                      },
                    ],
                    { cancelable: true }
                  );
                }}>
                  <Icon name={"trash"} color={"#e74c3c"} style={styles.btn} />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
      
      <Text style={styles.boxTitle}>매도 진행 중</Text>
      <ScrollView style={styles.boxContainer}>
        
        {/*미체력 매도 목록 생성*/}
        {sellList.map((obj, index) => {
          const localeP = obj.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //자릿수 나누기
          const localeQ = obj.quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //자릿수 나누기
          const totalPrice = (obj.price * obj.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //자릿수 나누기

          return (
            <View key={index} style={styles.contentContainer}>
              <View style={styles.infoBox}>
                <Text style={styles.contentTitle}>{obj.name}</Text>
                <View style={styles.infoLine}>
                  <Text style={styles.infoName}>희망가</Text>
                  <Text style={styles.infoValue}>{localeP}</Text>
                </View>
                <View style={styles.infoLine}>
                  <Text style={styles.infoName}>수량</Text>
                  <Text style={styles.infoValue}>{localeQ}</Text>
                </View>
                <View style={styles.infoLine}>
                  <Text style={styles.infoName}>총금액</Text>
                  <Text style={styles.infoValue}>{totalPrice}</Text>
                </View>
              </View>
              <View style={styles.btnBox}>
                <TouchableOpacity onPress={() => {
                  //
                }}>
                  <Icon name={"edit"} color={"#3498db"} style={styles.btn}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  Alert.alert(
                    "매수",
                    "정말 주문을 삭제하시겠습니까?",
                    [
                      {
                        text: "YES",
                        onPress: () => { alert("주문취소") },
                      },
                      {
                        text: "NO",
                      },
                    ],
                    { cancelable: true }
                  );
                }}>
                  <Icon name={"trash"} color={"#e74c3c"} style={styles.btn} />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
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
  boxTitle: {
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 26,
    marginTop: 10,
  },
  contentTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom:5,
  },
  infoBox: {
    flex:1,
  },
  infoLine: {
    flexDirection: "row"
  },
  infoName: {
    fontSize: 16,
    fontWeight: "bold",
    width: 60
  },
  infoValue: {
    fontSize: 16 
  },
  btnBox: {
    justifyContent:"center",
  },
  btn: {
    padding: 10,
    fontSize:30
  },
  contentContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    marginVertical: 10,
    padding: 15,
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
});

export default HistoryScreen;