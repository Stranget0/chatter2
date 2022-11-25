import Svg, { Circle, Path, SvgProps } from "react-native-svg";

const PhoneIcon = (props: SvgProps) => (
  <Svg width="44" height="44" viewBox="0 0 44 44" fill="none" {...props}>
    <Circle cx="22" cy="22" r="22" fill="white" />
    <Path
      d="M29.5024 24.7629C28.7073 23.978 27.7147 23.978 26.9247 24.7629C26.322 25.3605 25.7194 25.9581 25.1269 26.5659C24.9648 26.733 24.8281 26.7684 24.6306 26.657C24.2406 26.4443 23.8253 26.2721 23.4506 26.0392C21.7034 24.9402 20.2398 23.5273 18.9433 21.9371C18.3001 21.147 17.7279 20.3013 17.3278 19.3492C17.2468 19.1567 17.262 19.0301 17.4189 18.8731C18.0216 18.2907 18.6091 17.6931 19.2016 17.0956C20.0271 16.265 20.0271 15.2927 19.1965 14.457C18.7255 13.981 18.2546 13.5151 17.7836 13.039C17.2974 12.5529 16.8163 12.0616 16.3251 11.5805C15.53 10.8057 14.5373 10.8057 13.7473 11.5856C13.1396 12.1832 12.5572 12.7959 11.9393 13.3834C11.3671 13.9253 11.0784 14.5887 11.0176 15.3636C10.9214 16.6246 11.2303 17.8147 11.6659 18.9744C12.5572 21.3749 13.9144 23.507 15.5603 25.4618C17.7836 28.1054 20.4373 30.197 23.5417 31.7061C24.9395 32.3848 26.3879 32.9064 27.9629 32.9925C29.0466 33.0533 29.9886 32.7798 30.7432 31.934C31.2598 31.3567 31.8422 30.83 32.3891 30.278C33.1994 29.4576 33.2045 28.465 32.3992 27.6547C31.437 26.6874 30.4697 25.7252 29.5024 24.7629Z"
      fill="#5603AD"
    />
  </Svg>
);

export default PhoneIcon;
