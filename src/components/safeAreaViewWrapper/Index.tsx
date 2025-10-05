import { StatusBar, View } from "react-native";
import colors from "../../utils/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import CommonStyles from "../../style/Styles";

const SafeAreaViewWrapper = ({ children }: any) => {
    return (
        <SafeAreaView style={[CommonStyles.safeArea]}>
            <StatusBar
                backgroundColor={colors.STATUSBAR}
                barStyle="light-content"
                translucent={false}
            />
            <View style={CommonStyles.container}>
                {children}
            </View>
        </SafeAreaView>
    )
}

export default SafeAreaViewWrapper