import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Header from '../../components/header/Index'
import { SafeAreaView } from 'react-native-safe-area-context'
function Index() {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} type="menu" title="Home" />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    </View>
    </SafeAreaView>
  )
}

export default Index
