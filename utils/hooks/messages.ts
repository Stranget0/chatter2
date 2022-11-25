import { Falsy } from "react-native";
import { useReceiveMessage } from "../api/receiveMessage";
import { useRoomData } from "../api/roomData";
import { useSendMessage } from "../api/sendMessage";
import { useUserTyping } from "../api/typingUser";

const useRoom = (loggedUserId: string | Falsy, roomId: string) => {
  const [messages, addMessage, room] = useRoomData(roomId);
  useReceiveMessage(roomId, addMessage);
  const onSend = useSendMessage(roomId, addMessage);
  const [isTyping, onInputChange] = useUserTyping(loggedUserId, roomId);

  return { messages, isTyping, onInputChange, onSend, room };
};

export default useRoom;
