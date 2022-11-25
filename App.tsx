import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import widlarzClient from "./lib/api";
import { UserProvider } from "./utils/contexts/User";
import { useLoadFonts } from "./utils/hooks/loadFonts";
import Rooms from "./views/Rooms";
import Chat from "./views/Chat";
import LogIn from "./views/LogIn";
import SignUp from "./views/SignUp";
import { HeaderProvider } from "./utils/contexts/Header";
import Header from "./components/Header";
import * as SplashScreen from 'expo-splash-screen';
const disableHeader = { header: () => null };

SplashScreen.preventAutoHideAsync()
export default function App() {
  const fontsLoaded = useLoadFonts();
  if (!fontsLoaded) SplashScreen.hideAsync()
  const Stack = createNativeStackNavigator<ParamList>();

  return (
    <ApolloProvider client={widlarzClient}>
      <HeaderProvider>
        <UserProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="LogIn">
              <Stack.Screen
                name="Rooms"
                component={Rooms}
                options={{
                  header: ({ route }) => <Header title={route.name} />,
                }}
              />
              <Stack.Screen
                name="Chat"
                component={Chat}
                options={{
                  header: ({ route }) => <Header title={route.name} />,
                }}
              />
              <Stack.Screen
                name="LogIn"
                component={LogIn}
                options={disableHeader}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={disableHeader}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </UserProvider>
      </HeaderProvider>
    </ApolloProvider>
  );
}
