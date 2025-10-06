import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Header from '../../components/header/Index'
import SafeAreaViewWrapper from '../../components/safeAreaViewWrapper/Index'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

function Index({ navigation }: any) {
  return (
    <SafeAreaViewWrapper >
      <Header navigation={navigation} type="menu" title="Home" />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Home Screen</Text>
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
              networkExtras: {
                collapsible: 'bottom',
              },
            }}
          />
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
