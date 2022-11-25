import React, { FC, ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import { bigRadius, blue300, bigSpace, rowDirectionMixin } from "../styles";
import { useHeader } from "../utils/contexts/Header";
import ChatHeaderItem from "./chat/ChatHeaderItem";
import Typography from "./common/Typography";
import PhoneIcon from "./icons/Phone";
import RoomsIcon from "./icons/Rooms";
import SearchIcon from "./icons/Search";
import VideoCallIcon from "./icons/VideoCall";

interface Props {
  title: string;
}

const RoomsButtons = () => (
  <>
    <SearchIcon />
    <RoomsIcon />
  </>
);
const ChatButtons = () => (
  <>
    <PhoneIcon />
    <VideoCallIcon />
  </>
);

const Header: FC<Props> = ({ title }) => {
  // console.log({props});
  const [headerData] = useHeader();
  let Buttons: FC = () => <View />;
  switch (title) {
    case "Rooms":
      Buttons = RoomsButtons;
      break;
    case "Chat":
      Buttons = ChatButtons;
  }
  let leftSide: ReactNode = <Typography type="h1">{title}</Typography>;
  if (title === ("Chat" as keyof ParamList)) {
    if (headerData) {
      leftSide = <ChatHeaderItem room={headerData} />;
    } else leftSide = <View />;
    // else handleError("No headerData provided");
  }

  return (
    <View style={header}>
      {leftSide}
      <View style={headerButtons}>
        <Buttons />
      </View>
    </View>
  );
};

const header: ViewStyle = {
  backgroundColor: blue300,
  borderBottomLeftRadius: bigRadius,
  borderBottomRightRadius: bigRadius,
  height: 120,
  width: "100%",
  ...rowDirectionMixin("space-between"),
  alignItems: "flex-end",
  paddingHorizontal: bigSpace,
  paddingBottom: bigSpace,
};

const headerButtons: ViewStyle = {
  ...rowDirectionMixin("space-between"),
  width: 96,
};

export default Header;
