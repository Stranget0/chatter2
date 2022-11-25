import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { IMessage, MessageProps } from "react-native-gifted-chat";
import { isSameUser } from "react-native-gifted-chat/lib/utils";
import { smallSpace, plum300, radius, whiteColor } from "../../styles";
import Typography from "../common/Typography";

interface Props {
  message: MessageProps<IMessage>;
  loggedUser: ChatUser;
}

const ChatMessage: FC<Props> = ({ message, loggedUser }) => {
  const { currentMessage, nextMessage } = message;
  if (!currentMessage) return null;

  const { text, user } = currentMessage;
  const isYours = user._id === loggedUser.id;
  const userChanges = !isSameUser(currentMessage, nextMessage);

  let style = styles.message;
  if (isYours) {
    style = { ...style, ...styles.messageYours };
  }
  if (userChanges) style = { ...style, ...styles.messageBreak };

  return (
    <View style={style}>
      <Typography type="bodyText" white={isYours}>
        {text}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    borderRadius: radius,
    borderBottomLeftRadius: 0,
    backgroundColor: whiteColor,
    padding: smallSpace,
    marginBottom: smallSpace,
    width: "65%",
    marginLeft: smallSpace * 2,
  },
  messageYours: {
    backgroundColor: plum300,
    borderBottomLeftRadius: radius,
    borderBottomRightRadius: 0,
    marginLeft: 0,
    alignSelf: "flex-end",
  },
  messageBreak: {
    marginBottom: smallSpace * 2,
  },
});

export default ChatMessage;
