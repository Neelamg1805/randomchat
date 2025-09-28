// import { View, Text, TouchableOpacity, Platform } from 'react-native'
// import React from 'react'
// import Modal from "react-native-modal";
// import ImageViewer from 'react-native-image-zoom-viewer';
// import colors from '../../utils/colors';
// import Icon, { Icons } from '../icons/Index';
// import CommonStyles from '../../style/Styles';


// const MyImageViewer = (props: any) => {
//     const { data, setIsVisible, isVisible, headerVisible, index } = props;
//     const [currentIndex, setCurrentIndex] = React.useState(index || 0);
//     const is_ios = Platform.OS === 'ios';

//     return (
//         <Modal
//             style={{ flex: 1, margin: 0, top: 0, backgroundColor:colors.WHITE, position: 'relative' }}
//             isVisible={isVisible}
//             onBackdropPress={() => setIsVisible(false)}
//             onBackButtonPress={() => setIsVisible(false)}
//             onSwipeComplete={() => setIsVisible(false)}>
//             <ImageViewer
//                 imageUrls={data}
//                 enableImageZoom
//                 saveToLocalByLongPress={false}
//                 index={index}
//                 style={{ maxHeight: '95%' }}
//                 // renderImage={renderImage}
//                 onChange={(index: any) => setCurrentIndex(parseInt(index))}
//                 // renderIndicator={() => null}
//                 backgroundColor={colors.WHITE} />
//             <View style={{
//                 top: is_ios? 50: 10,
//                 padding: 5,
//                 paddingHorizontal:10,
//                 borderRadius:10,
//                 width:'100%',
//                 position: 'absolute',
//                 backgroundColor: colors.VERY_LIGHT_GRAY,
//                 justifyContent:"space-between",
//                 flexDirection: 'row',
//                 alignItems: 'center'
//             }}>
//                 <View style={{paddingHorizontal:20}}></View>

//                 {headerVisible && <Text style={CommonStyles.paragraph_18_black}>{currentIndex + 1 + " / " + data.length}</Text>}

//                 <TouchableOpacity style={{  }} onPress={() => setIsVisible(false)}>
//                     <Icon type={Icons.Ionicons} name={"close"} size={35} color={colors.BLACK} />
//                 </TouchableOpacity>
//             </View>
//         </Modal>
//     )
// }

// export default MyImageViewer;