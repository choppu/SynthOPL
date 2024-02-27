import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useAppState } from '../hooks/appContext';
import ListItem from '../components/ListItem';
import { DescriptorPatch, ProgramsListItem } from '../types/SynthTypes';
import AppStyle from '../ui/AppStyle';

const ProgramsScreen = ({navigation}: any) => {
  const {appState, dispatch} = useAppState();

  const selectProgram = (descriptor: ProgramsListItem) => {
    dispatch({type: "selectProgram", payload: {updatedValue: {name: descriptor.name, bank: descriptor.bank, num: descriptor.num}} as DescriptorPatch});
    navigation.navigate('Synth');

  }

  return (
    <SafeAreaView style={AppStyle.screenContainer}>
      <FlatList
        data={appState.programs}
        renderItem={({item}) => <ListItem item={item} isActive={item.name == appState.activeProgram.descriptor.name} onChangeFunc={selectProgram}></ListItem>}
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

export default ProgramsScreen;