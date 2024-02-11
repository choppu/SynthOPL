import React, {useState} from 'react';
import {
  SafeAreaView,
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
import { mainColor, mainFont, tabBarInactiveColor } from './src/utils/StyleConsts';
import AppStyle from './src/ui/AppStyle';
import { Device } from 'react-native-ble-plx';
import synthOPL from './src/hooks/synthOPL';
import { GATT_OPL_CHR_UUID_PROGRAM } from './src/utils/AppConsts';

const Tab = createBottomTabNavigator();

const App = () => {
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectedDevice,
    connectToDevice,
    disconnectFromDevice,
    readCharacteristic,
    writeCharacteristic
  } = useBLE();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const {
    activeProgram,
    programList,
    decodeProgram
  } = synthOPL();

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

  const handleDeviceConnection = (device: Device) => {
    connectToDevice(device, async(isConnected: boolean) => {
      if(isConnected) {
        let data = await readCharacteristic(device, GATT_OPL_CHR_UUID_PROGRAM);
        data ? decodeProgram(data) : console.log("No data available");
      }
    })
  }

  return (
    <SafeAreaView style={AppStyle.container}>
      <View style={AppStyle.topContentContainer}>
      <TouchableOpacity
        onPress={connectedDevice ? disconnectFromDevice : openModal}
        style={AppStyle.connectButton}>
        <Text style={AppStyle.connectButtonText}>
          {connectedDevice ? 'Disconnect Device' : 'Connect Device'}
        </Text>
      </TouchableOpacity>
      <View style={AppStyle.bleImageContainer}>
        {connectedDevice ? ( <BLEConnectedIcon width={28} height={28}/> ) : ( <BLEDisconnectedIcon width={28} height={28} /> )}
      </View>
      </View>
      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={handleDeviceConnection}
        devices={allDevices}
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
                    component={SynthScreen}
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
};

export default App;
