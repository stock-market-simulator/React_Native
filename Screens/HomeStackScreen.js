
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ToastAndroid, processColor } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';

import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryCandlestick, VictoryLabel, VictoryContainer, VictoryLine } from "victory-native";

const Stack = createStackNavigator();



function HomeStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Trade" component={TradeScreen} />
      <Stack.Screen name="Trade2" component={Trade2Screen} />
      <Stack.Screen name="Trade3" component={Trade3Screen} />
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
              <TouchableOpacity style={[styles.contentContainer, { flex: 1, padding: 15 }]} key={index} onPress={() => {
                navigation.navigate('Trade');
              }}>
                <Text style={styles.contentTitle}>{obj.name}</Text>
                <View style={[{ flex: 1 }, { alignItems: "flex-end", justifyContent: "flex-end" }]}>
                  <Icon style={[obj.percent > 0 ? { color: "#e74c3c" } : { color: "#3498db" }, { fontSize: 30 }]} name={obj.percent > 0 ? "caret-up" : "caret-down"}> {toLocale}</Icon>
                  <Text style={[{ fontWeight: "bold", fontSize: 25 }, obj.percent > 0 ? { color: "#e74c3c" } : { color: "#3498db" }]}>{obj.percent > 0 ? "+" + obj.percent : obj.percent}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    </View>
  );
}
function SearchScreen({ navigation }) {
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
          {/*검색 기록 리스트 생성 최대 10개 정도 까지 제한할 예정 각 종목으로 navigation 기능*/}
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

function TradeScreen({ navigation }) {
  const [selectedCycle = 0, setSelectedCycle] = useState();
  const [selectedStyle = 0, setSelectedStyle] = useState();

  const toDay = new Date();

  var randP;
  var randPtemp;

  var day = [];
  var week = [];
  var month = [];
  var month3 = [];
  var year = [];
  var year5 = [];

  var dayLine = [];
  var weekLine = [];
  var monthLine = [];
  var month3Line = [];
  var yearLine = [];
  var year5Line = [];

  var dayVolume = [];
  var weekVolume = [];
  var monthVolume = [];
  var month3Volume = [];
  var yearVolume = [];
  var year5Volume = [];

  randP = 1000;
  for (var i = 0; i < 60; i++) {
    randPtemp = randP;
    randP = randP + (Math.round(Math.random(10) * 100) - 50);
    if (randPtemp > randP)
      year5 = year5.concat({ open: randPtemp, close: randP, high: randPtemp + (Math.round(Math.random(10) * 15)), low: randP - (Math.round(Math.random(10) * 15)) });
    else
      year5 = year5.concat({ open: randPtemp, close: randP, high: randP + (Math.round(Math.random(10) * 15)), low: randPtemp - (Math.round(Math.random(10) * 15)) });

    year5Line = year5Line.concat({ x: i, y: randP});
    year5Volume = year5Volume.concat({ x: i, y: Math.round(Math.random(10) * 100)});
  };
  randP = 1000;
  for (var i = 0; i < 51; i++) {
    randPtemp = randP;
    randP = randP + (Math.round(Math.random(10) * 100) - 50);
    if (randPtemp > randP)
      year = year.concat({ open: randPtemp, close: randP, high: randPtemp + (Math.round(Math.random(10) * 15)), low: randP - (Math.round(Math.random(10) * 15)) });
    else
      year = year.concat({ open: randPtemp, close: randP, high: randP + (Math.round(Math.random(10) * 15)), low: randPtemp - (Math.round(Math.random(10) * 15)) });

    yearLine = yearLine.concat({ x: i, y: randP});
    yearVolume = yearVolume.concat({ x: i, y: Math.round(Math.random(10) * 100)});
  };
  randP = 1000;
  for (var i = 0; i < 60; i++) {
    randPtemp = randP;
    randP = randP + (Math.round(Math.random(10) * 100) - 50);
    if (randPtemp > randP)
      month3 = month3.concat({ open: randPtemp, close: randP, high: randPtemp + (Math.round(Math.random(10) * 15)), low: randP - (Math.round(Math.random(10) * 15)) });
    else
      month3 = month3.concat({ open: randPtemp, close: randP, high: randP + (Math.round(Math.random(10) * 15)), low: randPtemp - (Math.round(Math.random(10) * 15)) });
    
    month3Line = month3Line.concat({ x: i, y: randP});
    month3Volume = month3Volume.concat({ x: i, y: Math.round(Math.random(10) * 100)});
  };
  randP = 1000;
  for (var i = 0; i < 23; i++) {
    randPtemp = randP;
    randP = randP + (Math.round(Math.random(10) * 100) - 50);
    if (randPtemp > randP)
      month = month.concat({ open: randPtemp, close: randP, high: randPtemp + (Math.round(Math.random(10) * 15)), low: randP - (Math.round(Math.random(10) * 15)) });
    else
      month = month.concat({ open: randPtemp, close: randP, high: randP + (Math.round(Math.random(10) * 15)), low: randPtemp - (Math.round(Math.random(10) * 15)) });

    monthLine = monthLine.concat({ x: i, y: randP});
    monthVolume = monthVolume.concat({ x: i, y: Math.round(Math.random(10) * 100)});
  };
  randP = 1000;
  for (var i = 0; i < 35; i++) {
    randPtemp = randP;
    randP = randP + (Math.round(Math.random(10) * 100) - 50);
    if (randPtemp > randP)
      week = week.concat({ open: randPtemp, close: randP, high: randPtemp + (Math.round(Math.random(10) * 15)), low: randP - (Math.round(Math.random(10) * 15)) });
    else
      week = week.concat({ open: randPtemp, close: randP, high: randP + (Math.round(Math.random(10) * 15)), low: randPtemp - (Math.round(Math.random(10) * 15)) });

    weekLine = weekLine.concat({ x: i, y: randP});
    weekVolume = weekVolume.concat({ x: i, y: Math.round(Math.random(10) * 100)});
  };
  randP = 1000;
  for (var i = 0; i < 39; i++) {
    randPtemp = randP;
    randP = randP + (Math.round(Math.random(10) * 100) - 50);
    if (randPtemp > randP)
      day = day.concat({ open: randPtemp, close: randP, high: randPtemp + (Math.round(Math.random(10) * 15)), low: randP - (Math.round(Math.random(10) * 15)) });
    else
      day = day.concat({ open: randPtemp, close: randP, high: randP + (Math.round(Math.random(10) * 15)), low: randPtemp - (Math.round(Math.random(10) * 15)) });

    dayLine = dayLine.concat({ x: i, y: randP});
    dayVolume = dayVolume.concat({ x: i, y: Math.round(Math.random(10) * 100)});
  };
  var all = [day, week, month, month3, year, year5];
  var allLine = [dayLine, weekLine, monthLine, month3Line, yearLine, year5Line];
  var allVolume = [dayVolume, weekVolume, monthVolume, month3Volume, yearVolume, year5Volume];

  const item = ["삼성전자", "90000", "91200", true]; //서버에서 받아올 데이터
  const itemP = item[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //자릿수 나누기

  let Chart = null;
  if (selectedStyle == 0) {
    Chart = <VictoryCandlestick 
    candleColors={{ positive: "#e74c3c", negative: "#3498db" }}
    candleRatio={0.5}
    data={all[selectedCycle]}
  />;
  } else {
    Chart = <VictoryLine
    style={{
      data: { stroke: "#c43a31" },
      parent: { border: "1px solid #ccc"}
    }}
    data={allLine[selectedCycle]}
  />;
  }

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 30, flexDirection: "row", alignItems: "center" }}>
        <Text style={[styles.boxTitle, { marginTop: 0, fontSize: 50, flex: 1 }]}>{item[0]}</Text>
        <Icon style={{ flex: 1 }} size={50} color={"#f1c40f"} name={"star"} />
      </View>
      <Text style={[styles.boxTitle, { marginTop: 0, color: "#e74c3c" }]}>{itemP} 원</Text>
      <Text style={[styles.boxTitle, { marginTop: 0, color: "#e74c3c", fontSize: 26 }]}>+{item[2] - item[1]} (2.3%)</Text>
      <View style={styles.boxContainer}>
        <View style={[styles.contentContainer]}>
          <View style={{flexDirection: "row-reverse"}}>
            <View style={{ backgroundColor: "#e0e0e0", Height:60, margin: 10, borderRadius: 10, alignItems: "center", justifyContent: "center" }}>
              <Picker
                style={{ width: 120 }}
                selectedValue={selectedCycle}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedCycle(itemValue)
                }>
                <Picker.Item label="1일" value="0" />
                <Picker.Item label="1주일" value="1" />
                <Picker.Item label="1개월" value="2" />
                <Picker.Item label="3개월" value="3" />
                <Picker.Item label="1년" value="4" />
                <Picker.Item label="5년" value="5" />
              </Picker>
            </View>
            <Picker
                style={{ width: 120 }}
                selectedValue={selectedStyle}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedStyle(itemValue)
                }>
                <Picker.Item label="candle" value="0" />
                <Picker.Item label="line" value="1" />
              </Picker>
          </View>
          <View style={{ alignSelf: "baseline" }}>

            <VictoryChart
            height={200}
              containerComponent={<VictoryContainer responsive={true} />}
            >
            <VictoryAxis dependentAxis/>
             {Chart}
             
            </VictoryChart>
            <VictoryBar
             height={50}
    style={{ data: { fill: "gray" } }}
    alignment="start"
    data={allVolume[selectedCycle]}
  />
          </View>
        </View>
        <View style={{ flex: 2, justifyContent: "center" }}>
          <View style={[styles.contentContainer, { height: 80, flexDirection: "row" }]}>
            <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center" }} onPress={() => {
              navigation.navigate('Trade2');
            }}>
              <Text style={{ fontSize: 26, fontWeight: "bold" }}>매도</Text>
            </TouchableOpacity>
            <View style={{ width: 5, marginVertical: 15, backgroundColor: "#c4c4c4" }} />
            <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center" }} onPress={() => {
              navigation.navigate('Trade3');
            }}>
              <Text style={{ fontSize: 26, fontWeight: "bold" }}>매수</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
function Trade2Screen({ navigation }) {
  const item = ["삼성전자", "90000", "91200", true]; //서버에서 받아올 데이터
  const itemP = item[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //자릿수 나누기
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 30, flexDirection: "row", alignItems: "center" }}>
        <Text style={[styles.boxTitle, { marginTop: 0, fontSize: 50, flex: 1 }]}>{item[0]}</Text>
      </View>
      <Text style={[styles.boxTitle, { marginTop: 0, color: "black", fontSize: 32 }]}>{itemP} 원</Text>
      <View style={styles.boxContainer}>
        <View style={[styles.contentContainer, { flex: 1, marginVertical: 40 }]}>
          <TouchableOpacity style={{ margin: 10, marginTop: 30, borderRadius: 10 }}>
            <Text style={{ fontSize: 32, fontWeight: "bold" }}>시장가</Text>
          </TouchableOpacity>
          <View style={{ marginHorizontal: 15, flex: 1 }}>
            <Text style={{ fontSize: 32, fontWeight: "bold", color: "#2ecc71" }}>90,000 에</Text>
            <Text style={{ fontSize: 32, fontWeight: "bold", color: "#bebebe" }}>수량 + = 개</Text>
            <Text style={{ fontSize: 32, fontWeight: "bold", color: "black" }}>판매합니다.</Text>
          </View>
          <TouchableOpacity style={{ alignSelf: "flex-end", width: 120, height: 50, backgroundColor: "#e0e0e0", margin: 10, borderRadius: 10, alignItems: "center", justifyContent: "center" }}
            onPress={() => {
              ToastAndroid.show("거래가 요청되었습니다", ToastAndroid.SHORT);
            }}>
            <Text style={{ fontSize: 16 }}>판매</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
function Trade3Screen({ navigation }) {
  const item = ["삼성전자", "90000", "91200", true]; //서버에서 받아올 데이터
  const itemP = item[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //자릿수 나누기
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 30, flexDirection: "row", alignItems: "center" }}>
        <Text style={[styles.boxTitle, { marginTop: 0, fontSize: 50, flex: 1 }]}>{item[0]}</Text>
      </View>
      <Text style={[styles.boxTitle, { marginTop: 0, color: "black", fontSize: 32 }]}>{itemP} 원</Text>
      <View style={styles.boxContainer}>
        <View style={[styles.contentContainer, { flex: 1, marginVertical: 40 }]}>
          <TouchableOpacity style={{ margin: 10, marginTop: 30, borderRadius: 10 }}>
            <Text style={{ fontSize: 32, fontWeight: "bold" }}>시장가</Text>
          </TouchableOpacity>
          <View style={{ marginHorizontal: 15, flex: 1 }}>
            <Text style={{ fontSize: 32, fontWeight: "bold", color: "#2ecc71" }}>90,000 에</Text>
            <Text style={{ fontSize: 32, fontWeight: "bold", color: "#bebebe" }}>수량 + = 개</Text>
            <Text style={{ fontSize: 32, fontWeight: "bold", color: "black" }}>구매합니다.</Text>
          </View>
          <TouchableOpacity style={{ alignSelf: "flex-end", width: 120, height: 50, backgroundColor: "#e0e0e0", margin: 10, borderRadius: 10, alignItems: "center", justifyContent: "center" }}
            onPress={() => {
              ToastAndroid.show("거래가 요청되었습니다", ToastAndroid.SHORT);
            }}>
            <Text style={{ fontSize: 16 }}>판매</Text>
          </TouchableOpacity>
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
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 36,
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