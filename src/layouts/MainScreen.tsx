import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppState } from '../hooks/appContext';
import React, { useState } from 'react';
import { Device } from 'react-native-ble-plx';
import { GATT_OPL_CHR_UUID_PROGRAM } from '../utils/AppConsts';
import DeviceModal from '../components/DeviceConnectionModal';
import AppStyle from '../ui/AppStyle';
import SynthScreen from './SynthScreen';

import BLEConnectedIcon from '../assets/img/ble_connected.svg';
import ProgramsScreenIcon from '..//assets/img/programs_list.svg';
import SynthScreenIcon from '../assets/img/synth.svg';
import KeyboardScreenIcon from '../assets/img/midi_keyboard.svg'
import BLEDisconnectedIcon from '../assets/img/ble_disconnected.svg';
import { mainColor, mainFont, tabBarInactiveColor } from '../utils/StyleConsts';
import ProgramsScreen from './ProgramsScreen';
import VirtualKeyboardScreen from './VirtualKeyboardScreen';
import BLE from '../utils/BLE';
import SynthOPL from '../utils/Synth';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  const {appState, dispatch} = useAppState();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [allDevices, setAllDevices] = useState<Device[]>([]);

  const addDevice = (newDevice: Device) => {
    setAllDevices([...allDevices, newDevice]);
  }

  const scanForDevices = () => {
    BLE.requestPermissions((isGranted: boolean) => {
      if (isGranted) {
        BLE.scanForPeripherals(allDevices, addDevice);
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

  const disconnectDevice = async () => {
    BLE.disconnectFromDevice(appState.connectedDevice, () => {});
    dispatch({type: "connect", payload: null});
  }

  const setConnectedDevice = (device: Device) => {
    dispatch({type: "connect", payload: device});
  }

  const handleDeviceConnection = (device: Device) => {
    BLE.connectToDevice(device, async(isConnected: boolean) => {
      if(isConnected) {
        let data = await BLE.readCharacteristic(device, GATT_OPL_CHR_UUID_PROGRAM);
        if(data) {
          let program = SynthOPL.decodeProgram(data);
          dispatch({type: "setProgram", payload: program});
        }
      }
    }, setConnectedDevice)
  }

  return (
    <SafeAreaView style={AppStyle.container}>
    <View style={AppStyle.topContentContainer}>
    <TouchableOpacity
      onPress={appState.connectedDevice ? disconnectDevice : openModal}
      style={AppStyle.connectButton}>
      <Text style={AppStyle.connectButtonText}>
        {appState.connectedDevice ? 'Disconnect Device' : 'Connect Device'}
      </Text>
    </TouchableOpacity>
    <View style={AppStyle.bleImageContainer}>
      {appState.connectedDevice ? ( <BLEConnectedIcon width={28} height={28}/> ) : ( <BLEDisconnectedIcon width={28} height={28} /> )}
    </View>
    </View>
    <DeviceModal
      devices={allDevices}
      closeModal={hideModal}
      visible={isModalVisible}
      connectToPeripheral={handleDeviceConnection}
    />
      <NavigationContainer>
            <Tab.Navigator initialRouteName="Synth" screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: mainColor,
              tabBarInactiveTintColor: tabBarInactiveColor,
              tabBarLabelStyle: {
                fontFamily: mainFont,
                paddingBottom: '2%'
              }
            }}>
            <Tab.Screen
                name="Synth"
                children={() => <SynthScreen />}
                options={{ tabBarIcon:({ focused }) => (<SynthScreenIcon width={20} height={20} fill={focused ? mainColor : tabBarInactiveColor}/>)}}
                />
            <Tab.Screen
                name="Programs"
                component={ProgramsScreen}
                options={{ tabBarIcon:({ focused }) => (<ProgramsScreenIcon width={20} height={20} fill={focused ? mainColor : tabBarInactiveColor}/>)}}
            />
            <Tab.Screen
                name="Virtual Keyboard"
                component={VirtualKeyboardScreen}
                options={{ tabBarIcon:({ focused }) => (<KeyboardScreenIcon width={20} height={20} fill={focused ? mainColor : tabBarInactiveColor}/>)}}
            />
            </Tab.Navigator>
        </NavigationContainer>
  </SafeAreaView>
  );
}

export default MainScreen;