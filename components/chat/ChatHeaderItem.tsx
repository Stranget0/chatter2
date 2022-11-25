import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import { smallSpace, plum500, bigSpace } from "../../styles";
import { useAppNavigation } from "../../utils/hooks/navigation";
import ProfileImage from "../common/ProfileImage";
import Typography from "../common/Typography";

type Props = { room: ChatRoom; isActive?: boolean; lastActive?: string };

const ChatHeaderItem = ({ room, isActive, lastActive }: Props) => {
  const { name, image } = room;
  const { goBack } = useAppNavigation();
  return (
    <View style={styles.container}>
      <Pressable onPress={goBack}>
        <Image
          style={styles.caret}
          source={require("../../assets/caret.png")}
        />
      </Pressable>
      <ProfileImage source={image} style={styles.image} />
      <View style={styles.titleContainer}>
        <Typography type="h4" style={styles.title} numberOfLines={1}>
          {name}
        </Typography>
        <Typography type="bodyText" white>
          {isActive ? "Active now" : lastActive ?? "Not active"}
        </Typography>
      </View>
    </View>
  );
};
const { width: windowWidth } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    maxWidth: windowWidth - 96 - bigSpace * 2 - smallSpace,
  },
  image: {
    width: 44,
    height: 44,
    marginRight: smallSpace,
    marginLeft: 18,
  },
  caret: {
    width: 8,
    height: 16,
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    color: plum500,
    maxWidth: "87%",
  },
});

export default ChatHeaderItem;
