import {FC } from "react";
import { DimensionValue, KeyboardTypeOptions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { defaultFontSize, defaultTextColor, mainColor, mainFont, mainFontSemiBold, secondaryColor, selectionColor, touchableOpacityActive } from "../utils/StyleConsts";
import { ProgramsListItem } from "../types/SynthTypes";

type ListItemProps = {
  item: ProgramsListItem,
  isActive: boolean,
  onChangeFunc: (item: ProgramsListItem) => void
};

const ListItem: FC<ListItemProps> = props => {
  const {item, isActive, onChangeFunc} = props;

  return (
    <View style={listItemStyle.container}>
      <TouchableOpacity key={item.name} style={listItemStyle.listItem} activeOpacity={touchableOpacityActive} onPress={() => onChangeFunc(item)}>
        <Text style={isActive ? listItemStyle.labelSelected : listItemStyle.label}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  )};

const listItemStyle = StyleSheet.create({
  container: {
    width: '85%',
    marginLeft: '7.5%',
    marginRight: '7.5%',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: secondaryColor,
    borderBottomWidth: 1
  },
  listItem: {

  },
  label: {
    color: mainColor,
    fontFamily: mainFont,
    fontSize: 16
  },
  labelSelected: {
    color: mainColor,
    fontFamily: mainFontSemiBold,
    fontSize: 16
  },
});

export default ListItem;