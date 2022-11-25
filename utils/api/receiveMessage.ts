import { gql, useSubscription } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { IMessage } from "react-native-gifted-chat";
import { userFrag } from "../../lib/api";
import { handleError } from "../errors";
import { messageToGiftedMessage } from "../gifted";
import { roomIdVar } from "../global";
import { user1 } from "./roomData";

export const messageAddedQuery = gql`
	subscription messageAdded(${roomIdVar}:String!){
  messageAdded(roomId:${roomIdVar}){
    body
    id
    insertedAt
    ${userFrag}
  }
}`;
export const useReceiveMessageQuery = (roomId: string): any =>
  useMemo(
    () => ({
      data: {
        messageAdded: {
          body: "SUBSCRIBED MESSAGE",
          insertedAt: new Date().toISOString(),
          id: "2",
          user: user1,
        },
      },
    }),
    []
  ); /* useSubscription<MessageAddedResponse, RoomVariable>(messageAddedQuery, {*/ // useSubscription<MessageAddedResponse, RoomVariable>(messageAddedQuery, {
// useSubscription<MessageAddedResponse, RoomVariable>(messageAddedQuery, {
//   variables: { roomId },
// });

export const useReceiveMessage = (
  roomId: string,
  onSuccess?: (m: IMessage) => void
) => {
  const {
    data: receivedMessageData,
    error,
    ...other
  } = useReceiveMessageQuery(roomId);
  if (error) handleError(error);

  // If received message, push it to messages
  useEffect(() => {
    if (receivedMessageData) {
      const receivedMessage = messageToGiftedMessage(
        receivedMessageData.messageAdded
      );
      if (onSuccess) onSuccess(receivedMessage);
      // setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessageData]);
  const receivedMessage = receivedMessageData?.messageAdded;
  return { receivedMessage, error, ...other };
};
