import { useEffect } from "react";
import Main from "../components/common/MainView";
import RoomsContainer from "../components/rooms";
import { useRooms } from "../utils/api/rooms";
import { useHeader } from "../utils/contexts/Header";

const Rooms = () => {
  // const rooms = useRooms();
  const rooms: ChatRoom[] = [
    {
      id: "1",
      name: "Alfred",
      image: {
        uri: "https://source.unsplash.com/featured/100x100",
        width: 100,
        height: 100,
      },
    },
    {
      id: "2",
      name: "Sigmunt",
      image: {
        uri: "https://source.unsplash.com/featured/100x100",
        width: 100,
        height: 100,
      },
    },
  ];
  const [, setHeader] = useHeader();
  useEffect(() => setHeader(null), []);
  return (
    <Main>
      <RoomsContainer rooms={rooms} />
    </Main>
  );
};

export default Rooms;
