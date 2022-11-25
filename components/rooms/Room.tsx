import { ImageStyle, Pressable, View, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";
import {
  smallSpace,
  plum500,
  radius,
  bigSpace,
  whiteColor,
} from "../../styles";
import { useAppNavigation } from "../../utils/hooks/navigation";
import { useReceiveMessage } from "../../utils/api/receiveMessage";
import ProfileImage from "../common/ProfileImage";
import Typography from "../common/Typography";
import Status from "./Status";

type Props = { room: ChatRoom };

const RoomView = ({ room }: Props) => {
  const { name, image } = room;
  // let message:IMessage|undefined = undefined
  const { receivedMessage } = useReceiveMessage(room.id);
  const isActive = !!receivedMessage;
  // const receivedMessage = data?.messageAdded.body;
  // const isActive = !!receivedMessage;
  const { navigate } = useAppNavigation();
  const onPress = () => {
    navigate("Chat", room);
  };
  return (
    <Pressable style={isActive ? roomViewActive : roomView} onPress={onPress}>
      <ProfileImage source={image} style={imageStyle} />
      <View style={texts}>
        <Typography type="h3" white={isActive}>
          {name}
        </Typography>
        <Typography white={isActive} type="bodyText" numberOfLines={1}>
          {receivedMessage?.body || "Not active"}
        </Typography>
      </View>
      <Status active={isActive} />
    </Pressable>
  );
};

export default RoomView;

const roomView: ViewStyle = {
  position: "relative",
  paddingVertical: smallSpace,
  paddingHorizontal: bigSpace,
  marginBottom: smallSpace,
  backgroundColor: whiteColor,
  borderRadius: radius,
  display: "flex",
  flexDirection: "row",
};
const roomViewActive: ViewStyle = {
  ...roomView,
  backgroundColor: plum500,
};
// const textActive: TextStyle = { color: whiteColor };
const imageStyle: ImageStyle & SvgProps = {
  width: 64,
  height: 64,
  marginRight: bigSpace,
};

const texts: ViewStyle = {
  display: "flex",
  justifyContent: "center",
  maxWidth: "80%",
};
