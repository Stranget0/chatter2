import { ScrollView, ViewStyle } from "react-native";
import RoomView from "./Room";

type Props = { rooms: ChatRoom[] };

const RoomsContainer = ({ rooms }: Props) => {
  return (
    <ScrollView style={roomsContainer}>
      {rooms.map((room) => (
        <RoomView room={room} key={room.id} />
      ))}
    </ScrollView>
  );
};

const roomsContainer: ViewStyle = { marginTop: 36 };

export default RoomsContainer;
