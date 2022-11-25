import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { Falsy } from "react-native";

type HeaderData = ChatRoom;

type SetHeader = Dispatch<SetStateAction<HeaderData | Falsy>>;
type UserState = { header?: HeaderData | Falsy; setHeader: SetHeader };

export const headerContext = createContext<UserState>({
  setHeader: (_: unknown) => _,
});
export const HeaderProvider: FC<{children:ReactNode}> = ({ children }) => {
  const [header, setHeader] = useState<Falsy | HeaderData>();
  const state = useMemo(() => ({ header, setHeader }), [header, setHeader]);
  return (
    <headerContext.Provider value={state}>{children}</headerContext.Provider>
  );
};

export const useHeader = (): [HeaderData | Falsy, SetHeader] => {
  const { header, setHeader } = useContext(headerContext);
  return [header, setHeader];
};
