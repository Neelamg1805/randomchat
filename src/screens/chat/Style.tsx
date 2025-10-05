import { StyleSheet } from "react-native";
import colors from "../../utils/colors";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.PURPLE_BACKGROUND,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: colors.PURPLE_PRIMARY,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    headerButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerButtonText: {
      fontSize: 20,
      color: colors.WHITE,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.WHITE,
    },
    chatContainer: {
      flex: 1,
      paddingHorizontal: 20,
    },
    dateContainer: {
      alignItems: 'center',
      marginVertical: 20,
    },
    dateText: {
      fontSize: 14,
      color: colors.PURPLE_TEXT_LIGHT,
      fontWeight: '500',
    },
    messageContainer: {
      marginVertical: 4,
    },
    messageBubble: {
      maxWidth: '80%',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 20,
    },
    userMessageBubble: {
      alignSelf: 'flex-end',
      marginLeft: '20%',
      backgroundColor: colors.PURPLE_PRIMARY,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 20,
    },
    otherMessageBubble: {
      alignSelf: 'flex-start',
      backgroundColor: colors.PURPLE_CARD_BG,
      marginRight: '20%',
    },
    userMessageText: {
      color: colors.WHITE,
      fontSize: 16,
      fontWeight: '500',
    },
    otherMessageText: {
      color: colors.PURPLE_TEXT,
      fontSize: 16,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: colors.WHITE,
      borderTopWidth: 1,
      borderTopColor: colors.PURPLE_BORDER,
    },
    attachmentButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.PURPLE_PRIMARY,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    attachmentButtonText: {
      color: colors.WHITE,
      fontSize: 20,
      fontWeight: 'bold',
    },
    textInput: {
      flex: 1,
      backgroundColor: colors.PURPLE_INPUT_BG,
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 10,
      fontSize: 16,
      color: colors.PURPLE_TEXT,
      maxHeight: 100,
    },
    sendButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.PURPLE_PRIMARY,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
    },
    sendButtonText: {
      color: colors.WHITE,
      fontSize: 16,
    },
    spacer: {
      height: 20,
    },
  });
export default styles;