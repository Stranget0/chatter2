import { FC } from "react";
import { Image, ImageProps } from "react-native";
import ProfilePlaceholder from "../icons/ProfilePlaceholder";

type Props = Partial<ImageProps>;

const ProfileImage: FC<Props> = ({ source, ...other }) => {
  if (!source) return <ProfilePlaceholder {...other} />;
  return <Image source={source} {...other} />;
};

export default ProfileImage;
