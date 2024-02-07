import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import useBLE from './src/hooks/useBLE';
import DeviceModal from './src/components/DeviceConnectionModal';
import BLEConnectedIcon from './src/assets/img/ble_connected.svg';
import ProgramsScreenIcon from './src/assets/img/programs_list.svg';
import SynthScreenIcon from './src/assets/img/synth.svg';
import KeyboardScreenIcon from './src/assets/img/midi_keyboard.svg'
import BLEDisconnectedIcon from './src/assets/img/ble_disconnected.svg';
import SynthScreen from './src/layouts/SynthScreen';
import ProgramsScreen from './src/layouts/ProgramsScreen';
import VirtualKeyboardScreen from './src/layouts/VirtualKeyboardScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    disconnectFromDevice,
  } = useBLE();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const scanForDevices = () => {
    requestPermissions(isGranted => {
      if (isGranted) {
        scanForPeripherals();
      }
    });
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const openModal = async () => {
    scanForDevices();
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heartRateTitleWrapper}>
      <TouchableOpacity
        onPress={connectedDevice ? disconnectFromDevice : openModal}
        style={styles.ctaButton}>
        <Text style={styles.ctaButtonText}>
          {connectedDevice ? 'Disconnect Device' : 'Connect Device'}
        </Text>
      </TouchableOpacity>
      <View style={styles.bleImageContainer}>
        {connectedDevice ? ( <BLEConnectedIcon width={28} height={28}/> ) : ( <BLEDisconnectedIcon width={28} height={28} /> )}
      </View>
      </View>
      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      />
      <NavigationContainer>
            <Tab.Navigator initialRouteName="Synth" screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: '#04303E',
              tabBarInactiveTintColor: '#ababbb',
              tabBarLabelStyle: {
                fontFamily: 'Inconsolata-Medium',
                paddingBottom: '2%'
              }
            }}>
            <Tab.Screen
                    name="Synth"
                    component={SynthScreen}
                    options={{ tabBarIcon:({ focused }) => (<SynthScreenIcon width={20} height={20} fill={focused ? "#04303E" : "#ababbb"}/>)}}
                />
                <Tab.Screen
                    name="Programs"
                    component={ProgramsScreen}
                    options={{ tabBarIcon:({ focused }) => (<ProgramsScreenIcon width={20} height={20} fill={focused ? "#04303E" : "#ababbb"}/>)}}
                />
                <Tab.Screen
                    name="Virtual Keyboard"
                    component={VirtualKeyboardScreen}
                    options={{ tabBarIcon:({ focused }) => (<KeyboardScreenIcon width={20} height={20} fill={focused ? "#04303E" : "#ababbb"}/>)}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  heartRateTitleWrapper: {
    flexDirection: 'row',
    margin: 0,
    backgroundColor: '#04303E',
    paddingBottom: '2%',
    paddingTop: '2%'
  },
  bleImageContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    width: '25%',
    marginRight: '5%'
  },
  ctaButton: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '65%',
    marginLeft: '5%'
  },
  ctaButtonText: {
    color: 'white',
    fontFamily: 'Inconsolata-Medium',
    fontSize: 12,
    textTransform: 'uppercase'
  },
});

export default App;