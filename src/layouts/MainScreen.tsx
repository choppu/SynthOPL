import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppState } from '../hooks/appContext';
import React, { useEffect, useState } from 'react';
import { Device } from 'react-native-ble-plx';
import { GATT_OPL_CHR_UUID_LIST_PRG, GATT_OPL_CHR_UUID_PROGRAM } from '../utils/AppConsts';
import DeviceModal from '../components/DeviceConnectionModal';
import AppStyle from '../ui/AppStyle';
import SynthScreen from './SynthScreen';

import ProgramsScreenIcon from '..//assets/img/programs_list.svg';
import SynthScreenIcon from '../assets/img/synth.svg';
import KeyboardScreenIcon from '../assets/img/midi_keyboard.svg'
import AddProgramIcon from '../assets/img/add_button.svg';
import { backgroundDark, defaultTextColor, extra, mainColor, mainFont, tabBarInactiveColor } from '../utils/StyleConsts';
import ProgramsScreen from './ProgramsScreen';
import VirtualKeyboardScreen from './VirtualKeyboardScreen';
import BLE from '../utils/BLE';
import SynthOPL from '../utils/Synth';
import ProgramAddModal from '../components/ProgramAddModal';
import IconButton from '../components/IconButton';
import Utils from '../utils/Utils';
import { ProgramsListItem } from '../types/SynthTypes';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  const {appState, dispatch} = useAppState();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [isDeviceConnected, setDeviceConnected] = useState<boolean>(false);

  const addIc = <AddProgramIcon width={20} height={20} fill={"white"}/>

  const [isAddProgramModalVisible, setAddProgramModalVisible] = useState(false);
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(true);

  const handleModalVisibility = (val: boolean) => {
    setAddProgramModalVisible(!val);
  }

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
    setSaveBtnDisabled(true);
    setDeviceConnected(false);
    dispatch({type: "connect", payload: null});
  }

  const setConnectedDevice = (device: Device) => {
    dispatch({type: "connect", payload: device});
  }

  const handleDeviceConnection = (device: Device) => {
    BLE.connectToDevice(device, async(isConnected: boolean) => {
      if(isConnected) {
        let programdData = await BLE.readCharacteristic(device, GATT_OPL_CHR_UUID_PROGRAM);
        let programs = [] as ProgramsListItem[];
        let programsList = await Utils.fetchList(device, programs, false);

        dispatch({type: "setProgramsList", payload: programsList});

        if(programdData) {
          let program = SynthOPL.decodeProgram(programdData);
          dispatch({type: "setProgram", payload: program});
        }

        BLE.subscribeToProgramUpdate(device, (program) => {
          let prg = SynthOPL.decodeProgram(program);
          dispatch({type: "setProgram", payload: prg});
        });

        setSaveBtnDisabled(false);
        setDeviceConnected(true);
      }
    }, setConnectedDevice)
  }

  useEffect(() => {
    if(!isDeviceConnected) {
      openModal();
    }
  }, [isDeviceConnected]);

  return (
    <SafeAreaView style={AppStyle.container}>
      <View style={AppStyle.topContentContainer}>
        <TouchableOpacity onPress={disconnectDevice} style={AppStyle.connectButton}>
          <Text style={AppStyle.connectButtonText}>Disconnect Device</Text>
        </TouchableOpacity>
        <View style={AppStyle.programButtonsContainer}>
          <View style={AppStyle.buttonContainer}>
            <IconButton title={'Add Program'} disabled={saveBtnDisabled} value={isAddProgramModalVisible} icon={addIc} onChangeFunc={handleModalVisibility}></IconButton>
          </View>
        </View>
      </View>
      <DeviceModal devices={allDevices} closeModal={hideModal} visible={isModalVisible} connectToPeripheral={handleDeviceConnection} />
    <View>
      <ProgramAddModal isVisible={isAddProgramModalVisible} onChangeFunc={handleModalVisibility}></ProgramAddModal>
    </View>
      <NavigationContainer>
            <Tab.Navigator initialRouteName="Synth" screenOptions={{
              headerShown: false,
              tabBarStyle: {
                backgroundColor: mainColor,
                borderColor: 'transparent'
              },
              tabBarActiveTintColor: extra,
              tabBarInactiveTintColor: defaultTextColor,
              tabBarLabelStyle: {
                fontFamily: mainFont,
                paddingBottom: '2%'
              }
            }}>
            <Tab.Screen
                name="Synth"
                children={() => <SynthScreen />}
                options={{ tabBarIcon:({ focused }) => (<SynthScreenIcon width={20} height={20} fill={focused ? extra : defaultTextColor}/>)}}
                />
            <Tab.Screen
                name="Programs"
                component={ProgramsScreen}
                options={{ tabBarIcon:({ focused }) => (<ProgramsScreenIcon width={20} height={20} fill={focused ? extra : defaultTextColor}/>)}}
            />
            <Tab.Screen
                name="Virtual Keyboard"
                component={VirtualKeyboardScreen}
                options={{ tabBarIcon:({ focused }) => (<KeyboardScreenIcon width={20} height={20} fill={focused ? extra : defaultTextColor}/>)}}
            />
            </Tab.Navigator>
        </NavigationContainer>
  </SafeAreaView>
  );
}

export default MainScreen;