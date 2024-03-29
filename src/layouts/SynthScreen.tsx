import React from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import KeyboardScreen from './synth/KeyboardScreen';
import DrumScreen from './synth/DrumScreen';
import { DRUMS } from '../utils/AppConsts';
import { extra } from '../utils/StyleConsts';

const Tab = createMaterialTopTabNavigator();

const SynthScreen = () => {
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
    <View style={{ flex: 1 }}>
      <Tab.Navigator
      initialRouteName="Keyboard"
      sceneContainerStyle={{
        flex: 1,
      }}
      screenOptions={{
        tabBarActiveTintColor: '#04303E',
        tabBarInactiveTintColor: '#ababbb',
        tabBarLabelStyle : {
          fontFamily: 'Inconsolata-Medium',
          fontSize: 11
        },
        tabBarItemStyle : {
          padding: 0
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#04303EBB'
        },
        tabBarStyle: {
          backgroundColor: extra
        }
      }}>
      <Tab.Screen name="Keyboard" component={KeyboardScreen} />
      {Object.entries(DRUMS).map(([key, val]) => {
           return (
            <Tab.Screen key={val} name={key} initialParams={{id: val}} component={DrumScreen} />
            );
       })}
    </Tab.Navigator>
    </View>
    </View>
  );
}

export default SynthScreen;