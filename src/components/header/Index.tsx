import * as React from 'react';
import { View, Image, Text, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';
import Style from './Style';
import { useSelector } from 'react-redux';
import CommonStyles from '../../style/Styles';
import Icon, { Icons } from '../icons/Index';
import colors from '../../utils/colors';


export default function Header({ navigation, type, title }: any) {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  return (
    <View style={Style.headerContainer}>
      <View style={[Style.headLeft]}>
        {type == 'menu' ? (
          <TouchableOpacity style={{ margin: 10, transform: 'rotate(90deg)' }} onPress={() => navigation.openDrawer()}>
            <Icon type={Icons.Feather} name={"bar-chart-2"} size={28} color={colors.WHITE} />

            {/* <Image source={LEFT_MENU} style={{ height: 30, width: 30 }} /> */}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={{ margin: 10, marginVertical: 15 }} onPress={() => navigation.goBack()}>
            <Icon type={Icons.AntDesign} name={"arrowleft"} size={20} color={colors.WHITE} />
          </TouchableOpacity>
        )}
        <View style={CommonStyles.center}>
          <Text style={[CommonStyles.heading_18_white, { textTransform: "capitalize" }]} numberOfLines={1}>{title}</Text>
        </View>
      </View>
      {type == 'menu' ? (<View style={[CommonStyles.flex_row]}>
        <TouchableOpacity onPress={() => navigation.navigate('SyncPage', { page: "Header" })} style={{ marginRight: 20 }}>
          <Icon type={Icons.MaterialIcons} name={"sync"} size={28} color={colors.WHITE} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ marginRight: 20 }}>
          <Icon type={Icons.FontAwesome} name={"user-circle"} size={25} color={colors.WHITE} />
        </TouchableOpacity>
      </View>
      ) : null}
    </View>
  );
}
