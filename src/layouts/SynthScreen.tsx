import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import KeyboardScreen from './synth/KeyboardScreen';
import CymbalScreen from './synth/CymbalScreen';
import ExtraScreen from './synth/ExtraScreen';
import HiHatScreen from './synth/HiHatScreen';
import KickScreen from './synth/KickScreen';
import SnareScreen from './synth/SnareScreen';
import TomScreen from './synth/TomScreen';

const Tab = createMaterialTopTabNavigator();

const SynthScreen = () => {
  return (
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
        }
      }}>
      <Tab.Screen name="Keyboard" component={KeyboardScreen} />
      <Tab.Screen name="Kick" component={KickScreen} />
      <Tab.Screen name="Snare" component={SnareScreen} />
      <Tab.Screen name="Tom" component={TomScreen} />
      <Tab.Screen name="Cymbal" component={CymbalScreen} />
      <Tab.Screen name="Hi-Hat" component={HiHatScreen} />
      <Tab.Screen name="Extra" component={ExtraScreen} />
    </Tab.Navigator>
    </View>
  );
}

export default SynthScreen;