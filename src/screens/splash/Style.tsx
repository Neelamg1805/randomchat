import { StyleSheet } from "react-native";
import colors from "../../utils/colors";

const Style =  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:colors.WHITE,
    },
    logo: {
      height: 200,
      width: 200,
      marginBottom: 10,
    },
  });


export default Style;
