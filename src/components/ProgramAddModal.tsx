import React, {FC, useState } from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { defaultTextColor, mainColor, mainFont, secondaryColor, selectionColor, tabBarInactiveColor, touchableOpacityActive } from "../utils/StyleConsts";
import Modal from "react-native-modal/dist/modal";

type ProgramAddModalProps = {
  isVisible: boolean;
  onChangeFunc: (val: boolean) => void;
};

const ProgramAddModal: FC<ProgramAddModalProps> = props => {
  const {isVisible, onChangeFunc} = props;
  const[programName, setProgramName] = useState('Main');
  const[programBank, setProgramBank] = useState('0');
  const[programNumber, setProgramNumber] = useState('0');

  return (
    <Modal isVisible={isVisible} onSwipeComplete={() => onChangeFunc(isVisible)} swipeDirection={['up', 'left', 'right', 'down']} style={modalStyle.modalContainer}>
        <View style={modalStyle.container}>
          <View style={modalStyle.headerContainer}>
          <View style={modalStyle.hr}></View>
            <Text style={modalStyle.header}>-Save Program-</Text>
          </View>
          <View style={modalStyle.inputContainer}>
            <TextInput placeholder="Name" style={modalStyle.textInput} cursorColor={mainColor} value={programName} onChangeText={setProgramName} underlineColorAndroid={'transparent'} selectionColor={selectionColor}></TextInput>
            <Text style={modalStyle.placeholder}>Name</Text>
          </View>
          <View style={modalStyle.inputContainer}>
            <TextInput keyboardType='numeric' placeholder="Bank" style={modalStyle.textInput} cursorColor={mainColor} value={programBank.toString()} key={"bank"} onChangeText={setProgramBank} selectionColor={selectionColor}></TextInput>
            <Text style={modalStyle.placeholder}>Bank - *0-127</Text>
          </View>
          <View style={modalStyle.inputContainer}>
            <TextInput keyboardType='numeric' placeholder="Number" style={modalStyle.textInput} cursorColor={mainColor} value={programNumber.toString()} key={"num"} onChangeText={setProgramNumber} selectionColor={selectionColor}></TextInput>
            <Text style={modalStyle.placeholder}>Number - *0-127</Text>
          </View>
        </View>
    </Modal>
  )};

const modalStyle = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0
  },
  container: {
    backgroundColor: 'white',
    height: 300,
    paddingBottom: 20,
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',

  },
  headerContainer: {
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 15,
    paddingLeft: '10%',
    paddingRight: '10%',
    alignItems: 'center'
  },
  hr: {
    marginTop: 5,
    width: 60,
    height: 3,
    backgroundColor: 'dimgray',
    borderRadius: 4
  },
  header: {
    color: secondaryColor,
    fontFamily: mainFont,
    fontSize: 17,
    fontWeight: '500',
    marginTop: 15,
  },
  inputContainer: {
    width: '80%'
  },
  textInput: {
    width: '100%',
    color: mainColor,
    borderBottomColor: mainColor,
    borderBottomWidth: 1,
    fontFamily: mainFont,
    fontSize: 14
  },
  placeholder: {
    color: secondaryColor,
    position: 'absolute',
    fontFamily: mainFont,
    right: 0,
    bottom: 15,
    top: 15,
    fontSize: 14
  }
});

export default ProgramAddModal;