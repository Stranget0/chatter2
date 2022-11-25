import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationTuple,
  OperationVariables,
  useMutation,
} from "@apollo/client";
import { useEffect, useState } from "react";
import { IMessage } from "react-native-gifted-chat";
import { userFrag } from "../../lib/api";
import { luser } from "../../views/LogIn";
import { handleError } from "../errors";
import { messageToGiftedMessage } from "../gifted";
import { roomIdVar } from "../global";

export const sendMessageQuery = gql`
	mutation sendMessage(${roomIdVar}:String!, $body:String!){
		sendMessage(roomId:${roomIdVar}, body:$body){
			id
			body
			insertedAt
			${userFrag}
		}
	}`;
export type SendMessageResponse = { sendMessage: ChatMessage };

let i = 1;
const getMock = (body: string) => ({
  data: {
    sendMessage: {
      body,
      id: i++ + "",
      insertedAt: new Date().toISOString(),
      user: luser,
    },
  },
  error: null,
});
export const useSendMessageQuery = () =>
  //  useMutation<SendMessageResponse>(sendMessageQuery);
  {
    /*  useMutation<SendMessageResponse>(sendMessageQuery);*/
    const [data, setData] = useState(getMock("FIRST"));
    return [(v: string) => setData(getMock(v)), data] as const;
  };

export const useSendMessage = (
  roomId: string,
  onSuccess?: (m: IMessage) => void
) => {
  const [sendMessage, { data: sendMessageData, error }] = useSendMessageQuery();

  if (error) handleError(error);
  // If sent message, push it to messages
  useEffect(() => {
    if (sendMessageData) {
      const sentMessage = messageToGiftedMessage(sendMessageData.sendMessage);
      if (onSuccess) onSuccess(sentMessage);
    }
  }, [sendMessageData]);

  const onSend = (messages: IMessage[]) =>
    sendMessage(messages[messages.length - 1].text);
  return onSend;
};
