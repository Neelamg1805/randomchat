import { Text } from "react-native"
import { View } from "react-native"
import CommonStyles from "../../style/Styles"
import Icon, { Icons } from "../icons/Index"
import colors from "../../utils/colors"

export const NotFound = ({ message }: { message?: string }) => {
    return (
        <View style={[CommonStyles.center, CommonStyles.flex_1]}>
            <Icon type={Icons.Feather} name="list" size={50} color={colors.GRAY} style={{ paddingTop: 19 }} />
            <Text style={[CommonStyles.paragraph_16_gray, { paddingTop: 20 }]}>{message || 'No Data Found'}</Text>
        </View>
    )
}
