
import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();

function HomeStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}

function HomeScreen({ navigation }) {
  const bookMark = [
    {
      name: "삼성전자",
      price: 90000,
      percent: 2.3 //원래 전일 종가로 계산해야함
    },
    {
      name: "대한항공",
      price: 28000,
      percent: -0.3 //원래 전일 종가로 계산해야함
    }
  ]; //서버에서 받아올 데이터

  return (
    <View style={styles.container}>
      <View style={styles.topSearchBar}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Search');
        }}>
          <Icon size={40} name={"search"} />
        </TouchableOpacity>
      </View>
      <Text style={styles.boxTitle}>주요 지수</Text>
      <View>
        <View style={{ flexDirection: "row" }}>
          <View style={[styles.contentContainer, { flex: 1, flexDirection: "row" }]}>
            <View style={{ flex: 1, margin: 15 }}>
              <Text style={[styles.contentTitle, { color: "#999999" }]}>코스피</Text>
              <View style={{ height: 150, borderWidth: 1 }}>
                <Text>차트</Text>
              </View>
            </View>
            <View style={{ width: 5, marginVertical: 15, backgroundColor: "#c4c4c4" }} />
            <View style={{ flex: 1, margin: 15 }}>
              <Text style={[styles.contentTitle, { color: "#999999" }]}>코스닥</Text>
              <View style={{ flex: 1, borderWidth: 1 }}>
                <Text>차트</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.boxContainer}>
        <Text style={styles.boxTitle}>관심 종목</Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          {/*관심종목 리스트 생성, 좌우 스크롤 기능 구현할지 미정*/}
          {bookMark.map((obj, index) => {
            const toLocale = obj.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //자릿수 나누기
            return (
              <View style={[styles.contentContainer, { flex: 1, padding: 15 }]} key={index}>
                <Text style={styles.contentTitle}>{obj.name}</Text>
                <View style={[{ flex: 1 }, { alignItems: "flex-end", justifyContent: "flex-end" }]}>
                  <Icon style={[obj.percent > 0 ? { color: "#e74c3c" } : { color: "#3498db" }, { fontSize: 30 }]} name={obj.percent > 0 ? "caret-up" : "caret-down"}> {toLocale}</Icon>
                  <Text style={[{ fontWeight: "bold", fontSize: 25 }, obj.percent > 0 ? { color: "#e74c3c" } : { color: "#3498db" }]}>{obj.percent > 0 ? "+" + obj.percent : obj.percent}</Text>
                </View>
              </View>
            )
          })}
        </View>
      </View>
    </View>
  );
}
function SearchScreen() {
  const searchHistory = ["삼성전자", "삼성전자우", "temp"]; //서버에서 받아올 데이터
  return (
    <View style={styles.container}>
      <Text style={styles.boxTitle}>검색</Text>
      <View style={styles.boxContainer}>
        <View style={[styles.contentContainer, { flexDirection: 'row' }]}>
          <TextInput style={{ marginLeft: 15, fontSize: 16, flex: 1 }} onChangeText={() => {
            //검색
          }} />
          <Icon style={{ fontSize: 20, margin: 15 }} name={"search"} />
        </View>
        <View style={[styles.contentContainer, { top: -25, paddingVertical: 10 }]}>
          {/*검색 기록 리스트 생성 최대 10개 정도 까지 제한할 예정*/}
          {searchHistory.map((obj, index) => {
            if (index == 0) {
              return (
                <View key={index}>
                  <TouchableOpacity style={{ padding: 10 }}>
                    <Text style={{ fontSize: 18 }}>{obj}</Text>
                  </TouchableOpacity>
                </View>

              )
            } else {
              return (
                <View key={index}>
                  <View style={{ height: 2, backgroundColor: '#c4c4c4', marginHorizontal: 10 }} />
                  <TouchableOpacity style={{ padding: 10 }}>
                    <Text style={{ fontSize: 18 }}>{obj}</Text>
                  </TouchableOpacity>
                </View>
              )
            }
          })}
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
  topSearchBar: {
    height: 40,
    margin: 20,
    alignItems: 'flex-end',
  },
  boxTitle: {
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

export default HomeStackScreen;