import * as React from 'react';
import { View, Image, Text, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import Style from './Style';
import CommonStyles from '../../style/Styles';
import Icon, { Icons } from '../icons/Index';
import colors from '../../utils/colors';


export default function Header({ navigation, type, title }: any) {
  return (
    <View style={Style.headerContainer}>
      <View style={[Style.headLeft]}>
        {type == 'menu' ? (
          <TouchableOpacity style={{ margin: 10 }} onPress={() => {
            if (navigation && navigation.openDrawer) {
              navigation.openDrawer();
            } else {
            }
          }}>
            <Text style={{ fontSize: 28, color: colors.WHITE }}>☰</Text>
            {/* <Icon type={Icons.Feather} name={"home"} size={28} color={colors.WHITE} /> */}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={{ margin: 10, marginVertical: 15 }} onPress={() => navigation.goBack()}>
            <Text style={{ fontSize: 20, color: colors.WHITE }}>←</Text>
            {/* <Icon type={Icons.AntDesign} name={"arrowleft"} size={20} color={colors.WHITE} /> */}
          </TouchableOpacity>
        )}
        <View style={CommonStyles.center}>
          <Text style={[CommonStyles.heading_18_white, { textTransform: "capitalize" }]} numberOfLines={1}>{title}</Text>
        </View>
      </View>
      {type == 'menu' ? (<View style={[CommonStyles.flex_row]}>
        <TouchableOpacity onPress={() => {
          if (navigation && navigation.navigate) {
            navigation.navigate('Home');
          }
        }} style={{ marginRight: 20 }}>
          <Text style={{ fontSize: 28, color: colors.WHITE }}>🔄</Text>
          {/* <Icon type={Icons.MaterialIcons} name={"sync"} size={28} color={colors.WHITE} /> */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          if (navigation && navigation.navigate) {
            navigation.navigate('Login');
          }
        }} style={{ marginRight: 20 }}>
          <Text style={{ fontSize: 25, color: colors.WHITE }}>👤</Text>
          {/* <Icon type={Icons.FontAwesome} name={"user-circle"} size={25} color={colors.WHITE} /> */}
        </TouchableOpacity>
      </View>
      ) : null}
    </View>
  );
}
