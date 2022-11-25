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
import { handleError } from "../errors";
import { useAppNavigation } from "../hooks/navigation";

type LoggedUser = ChatUser & { token: string };

type SetUser = Dispatch<SetStateAction<LoggedUser | undefined>>;
type UserState = { user?: LoggedUser; setUser: SetUser };

export const userContext = createContext<UserState>({
  setUser: (_: unknown) => _,
});
export const UserProvider: FC<{children:ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<undefined | LoggedUser>();
  const state = useMemo(() => ({ user, setUser }), [user, setUser]);
  return <userContext.Provider value={state}>{children}</userContext.Provider>;
};

export const useUser = (
  validate?: boolean
): [LoggedUser | undefined, SetUser] => {
  const { user, setUser } = useContext(userContext);
  const { navigate } = useAppNavigation();

  if (validate && user === undefined) {
    handleError("User is unavailable!", (m) => {
      console.error(m);
      navigate("LogIn");
    });
  }
  return [user, setUser];
};
