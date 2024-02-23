import React, {FC, useEffect, useState } from "react";
import {StyleSheet, Text, View } from "react-native";
import { mainColor, mainFont, secondaryColor, tabBarInactiveColor } from "../utils/StyleConsts";
import Modal from "react-native-modal/dist/modal";
import { useAppState } from "../hooks/appContext";
import TextButton from "./TextButton";
import { DescriptorPatch } from "../types/SynthTypes";
import OPLInput from "./OPLInput";

type ProgramAddModalProps = {
  isVisible: boolean;
  onChangeFunc: (val: boolean) => void;
};

const ProgramAddModal: FC<ProgramAddModalProps> = props => {
  const {isVisible, onChangeFunc} = props;
  const {appState, dispatch} = useAppState();
  const[programName, setProgramName] = useState('');
  const[programBank, setProgramBank] = useState('');
  const[programNumber, setProgramNumber] = useState('');

  useEffect(() => {
    setProgramName(appState.activeProgram.descriptor.name);
    setProgramBank(appState.activeProgram.descriptor.bank?.toString());
    setProgramNumber(appState.activeProgram.descriptor.num?.toString());
  }, [isVisible]);

  const programSave = () => {
    dispatch({type: "saveProgram", payload: {updatedValue: {name: programName, bank: Number(programBank), num: Number(programNumber)}} as DescriptorPatch});
    onChangeFunc(isVisible);
  }

  return (
    <Modal isVisible={isVisible} onSwipeComplete={() => onChangeFunc(isVisible)} swipeDirection={['up', 'left', 'right', 'down']} style={modalStyle.modalContainer}>
        <View style={modalStyle.container}>
          <View style={modalStyle.headerContainer}>
          <View style={modalStyle.hr}></View>
            <Text style={modalStyle.header}>-Save Program-</Text>
          </View>
          <OPLInput inputValue={programName} placeholder={"Name - * max 12 chars"} title={"Name"} keyboard={"default"} onChangeFunc={setProgramName}></OPLInput>
          <OPLInput inputValue={programBank} placeholder={"Bank - *0-127"} title={"Bank"} keyboard={"numeric"} onChangeFunc={setProgramBank}></OPLInput>
          <OPLInput inputValue={programNumber} placeholder={"Number - *0-127"} title={"Number"} keyboard={"numeric"} onChangeFunc={setProgramNumber}></OPLInput>
          <View style={modalStyle.buttonsContainer}>
          <TextButton label={"Cancel"} btnColor={tabBarInactiveColor} btnWidth={'50%'} btnJustifyContent='flex-start' disabled={false} onChangeFunc={() => onChangeFunc(isVisible)}></TextButton>
          <TextButton label={"Save"} btnColor={mainColor} disabled={false} btnWidth={'50%'} btnJustifyContent='flex-end' onChangeFunc={() => programSave()}></TextButton>
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
  buttonsContainer: {
    flexDirection: 'row',
    width: '80%'
  }
});

export default ProgramAddModal;