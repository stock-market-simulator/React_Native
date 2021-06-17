
import * as React from 'react';
import { } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
//import { TapGestureHandler } from 'react-native-gesture-handler';

//각 화면
import HomeStackScreen from './Screens/HomeStackScreen';
import HistoryScreen from './Screens/HistoryScreen';
import InfoStackScreen from './Screens/InfoStackScreen';
import SettingScreen from './Screens/SettingScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === '홈') {
              //iconName = focused ? 'home' : 'home';
              //size = focused ? 22 : 18;
              iconName = 'home';
              size = 30;
              color = focused ? 'black' : '#c4c4c4';
            } else if (route.name === '거래내역') {
              iconName = 'credit-card';
              size = 30;
              color = focused ? 'black' : '#c4c4c4';
            } else if (route.name === '내 정보') {
              iconName = 'address-card';
              size = 30;
              color = focused ? 'black' : '#c4c4c4';
            } else if (route.name === '설정') {
              iconName = 'cogs';
              size = 30;
              color = focused ? 'black' : '#c4c4c4';
            }

            // You can return any component that you like here!
            return (
              <Icon name={iconName} size={size} color={color} />
            );
          },
        })}
        tabBarOptions={{
          style: { height: 80 },
          activeTintColor: 'black',
          inactiveTintColor: '#c4c4c4',
          labelStyle: { fontSize: 15, bottom: 10 },
        }}
      >
        <Tab.Screen name="홈" component={HomeStackScreen} />
        <Tab.Screen name="거래내역" component={HistoryScreen} />
        <Tab.Screen name="내 정보" component={InfoStackScreen} />
        <Tab.Screen name="설정" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;