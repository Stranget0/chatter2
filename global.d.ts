import { ReactNode } from "react";
import { ImageProps } from "react-native";
import { roomIdKey } from "./utils/global";
declare global {
  type ChatRoom = {
    id: string;
    name: string;
    image?: ImageProps["source"];
  };

  interface ChatUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  }
  type ChatMessage = {
    body: string;
    id: string;
    insertedAt: string;
    user: ChatUser;
  };
  type ParamList = {
    Rooms: undefined;
    Chat: ChatRoom;
    LogIn: undefined;
    SignUp: undefined;
  };
  type RoomVariable = { [roomIdKey]: string };
}
