import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

export const useAppNavigation = <D extends keyof ParamList>() =>
  useNavigation<NavigationProp<ParamList, D>>();

export const useAppRoute = <D extends keyof ParamList>() =>
  useRoute<RouteProp<ParamList, D>>();
