import { View, Text, StyleSheet } from 'react-native';
import {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import OperatorComponent from '../../components/OperatorComponent';

const KeyboardScreen = () => {
  const [checked, SetChecked] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
      <OperatorComponent operatorId={0}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  }
});

export default KeyboardScreen;
