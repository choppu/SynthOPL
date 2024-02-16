import { StyleSheet } from "react-native";
import { defaultTextColor, mainBackgroundColor, mainColor, mainFont } from "../utils/StyleConsts";

const AppStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainBackgroundColor,
  },
  topContentContainer: {
    flexDirection: 'row',
    margin: 0,
    backgroundColor: mainColor,
    paddingBottom: '2%',
    paddingTop: '2%'
  },
  bleImageContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    width: '25%',
    marginRight: '5%'
  },
  connectButton: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '65%',
    marginLeft: '5%'
  },
  connectButtonText: {
    color: defaultTextColor,
    fontFamily: mainFont,
    fontSize: 12,
    textTransform: 'uppercase'
  },
  instrumentContainer: {

  },
  operatorsContainer: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  operatorLabel: {
    fontFamily: mainFont,
    fontSize: 13,
    color: mainColor,
    padding: 10
  },
  programButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '25%',
    marginRight: '5%'
  },
  buttonContainer: {
    marginLeft: 20
  },
});

export default AppStyle;