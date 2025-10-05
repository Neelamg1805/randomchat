import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Header from '../../components/header/Index'
import SafeAreaViewWrapper from '../../components/safeAreaViewWrapper/Index'

function Index({ navigation }: any) {
  return (
    <SafeAreaViewWrapper >
      <Header navigation={navigation} type="menu" title="Home" />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Home Screen</Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#007AFF',
              padding: 15,
              borderRadius: 8,
              marginTop: 20
            }}
            onPress={() => navigation.navigate('Chat')}
          >
            <Text style={{ color: 'white', fontSize: 16 }}>Go to Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaViewWrapper>
  )
}

export default Index
