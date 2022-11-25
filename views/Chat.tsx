import { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { GiftedChat, InputToolbar, Send } from "react-native-gifted-chat";
import ChatMessage from "../components/chat/Message";
import TypingIndicator from "../components/chat/TypingIndicator";
import Main from "../components/common/MainView";
// import ProfileImage from "../components/common/ProfileImage";
import SendIcon from "../components/icons/Send";
import {
  blackColor,
  blue300,
  smallSpace,
  fill,
  radius,
  bigSpace,
  whiteColor,
} from "../styles";
import { useHeader } from "../utils/contexts/Header";
import { useUser } from "../utils/contexts/User";
import { sortMessages, userToGiftedUser } from "../utils/gifted";
import useRoom from "../utils/hooks/messages";
import { useAppRoute } from "../utils/hooks/navigation";
import { luser } from "./LogIn";

const Chat = () => {
  const { params: roomData } = useAppRoute<"Chat">();
  const loggedUser = luser; 
  const [, setHeader] = useHeader();
  const userId = loggedUser?.id;
  const { id: roomId } = roomData;
  const { isTyping, messages, onInputChange, onSend, room } = useRoom(
    userId,
    roomId
  );

  useEffect(() => setHeader(roomData), []);
	
  // if (!loggedUser) return null;
  return (
    <Main>
      {room && (
        <GiftedChat
          onInputTextChanged={onInputChange}
          onSend={onSend}
          messages={sortMessages(messages)}
          user={userToGiftedUser(loggedUser)}
          timeTextStyle={{ right: styles.hideText, left: styles.hideText }}
          messagesContainerStyle={styles.container}
          renderMessage={(props) => (
            <ChatMessage message={props} loggedUser={loggedUser} />
          )}
          renderSend={(props) => (
            <Send {...props} containerStyle={styles.sendButton}>
              <SendIcon style={fill} />
            </Send>
          )}
          renderInputToolbar={(props) => (
            <InputToolbar {...props} containerStyle={styles.toolbar} />
          )}
          renderFooter={() => <TypingIndicator isTyping={isTyping} />}
          textInputProps={{ style: styles.input }}
          alwaysShowSend
          infiniteScroll
        ></GiftedChat>
      )}
    </Main>
  );
};

const sendSize = 34;
const toolbarGap = 17;
const inputHeight = 41;
const { width: windowWidth } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 2 * smallSpace,
    paddingBottom: inputHeight - 12,
  },
  hideText: {
    display: "none",
  },
  // avatar: {
  //   width: 24,
  //   height: 24,
  // },
  input: {
    backgroundColor: whiteColor,
    borderRadius: radius,
    borderBottomRightRadius: 0,
    height: inputHeight,
    width: windowWidth - 2 * bigSpace - toolbarGap - sendSize - 8,
    paddingHorizontal: 15,
    marginRight: toolbarGap,
    color: blackColor,
  },
  toolbar: {
    height: 73,
    width: "100%",
    padding: bigSpace,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    backgroundColor: blue300,
  },
  sendButton: {
    width: sendSize,
    height: sendSize,
  },
});

export default Chat;
