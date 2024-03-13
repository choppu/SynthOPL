import React, {FC, useCallback} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Modal,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Device} from 'react-native-ble-plx';
import BLEConnect from '../assets/img/ble_connect.svg';
import { defaultTextColor, mainColor, mainFont, secondaryColor, secondaryColorTransparent } from '../utils/StyleConsts';

type DeviceModalListItemProps = {
  item: ListRenderItemInfo<Device>;
  connectToPeripheral: (device: Device) => void;
  closeModal: () => void;
};

type DeviceModalProps = {
  devices: Device[];
  visible: boolean;
  connectToPeripheral: (device: Device) => void;
  closeModal: () => void;
};

const DeviceModalListItem: FC<DeviceModalListItemProps> = props => {
  const {item, connectToPeripheral, closeModal} = props;

  const connectAndCloseModal = useCallback(() => {
    connectToPeripheral(item.item);
    closeModal();
  }, [closeModal, connectToPeripheral, item.item]);

  return (
    <TouchableOpacity onPress={connectAndCloseModal} style={modalStyle.ctaButton}>
      <Text style={modalStyle.ctaButtonText}>{item.item.name}</Text>
    </TouchableOpacity>
  );
};

const DeviceModal: FC<DeviceModalProps> = props => {
  const {devices, visible, connectToPeripheral, closeModal} = props;

  const renderDeviceModalListItem = useCallback(
    (item: ListRenderItemInfo<Device>) => {
      return (
        <DeviceModalListItem item={item} connectToPeripheral={connectToPeripheral} closeModal={closeModal} />
      );
    },
    [closeModal, connectToPeripheral],
  );

  return (
    <Modal style={modalStyle.modalContainer} animationType="slide" transparent={false} visible={visible}>
      <SafeAreaView style={modalStyle.modalTitle}>
        <Text style={modalStyle.modalTitleText}> Tap on a device to connect</Text>
        <View style={modalStyle.iconContainer}>
          <BLEConnect width={145} height={145} />
        </View>
        <FlatList contentContainerStyle={modalStyle.modalFlatlistContiner} data={devices} renderItem={renderDeviceModalListItem} />
      </SafeAreaView>
    </Modal>
  );
};

const modalStyle = StyleSheet.create({
  modalContainer: {
    flex: 1
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
    paddingBottom: 35,
    paddingTop: 35
  },
  modalFlatlistContiner: {
    justifyContent: 'center',
    paddingBottom: 40,
    paddingTop: 55
  },
  modalTitle: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalTitleText: {
    textAlign: 'center',
    fontFamily: mainFont,
    color: mainColor,
    fontSize: 20,
    marginTop: 50,
    marginBottom: 40
  },
  ctaButton: {
    backgroundColor: secondaryColorTransparent,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    borderRadius: 3
  },
  ctaButtonText: {
    fontSize: 18,
    fontFamily: mainFont,
    textTransform: 'uppercase',
    color: defaultTextColor,
    textDecorationLine: 'underline'
  },
});

export default DeviceModal;