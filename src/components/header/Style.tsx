import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';


const Style = StyleSheet.create({
  headLeft: {
    width: '65%',
    display: 'flex',
    flexDirection: 'row',
  },
  headerContainer: {
    backgroundColor: colors.STATUSBAR,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  }
});
export default Style;