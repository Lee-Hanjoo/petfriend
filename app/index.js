import { NavigationContainer } from "@react-navigation/native";
import Navigation from "../Navigation";
import {setCustomText} from 'react-native-global-props';

export default function Page() {

  const customTextProps = {
    style: {
      fontFamily: 'WantedSans-Regular',
    },
  };

  setCustomText(customTextProps);

  const customTheme = {
    colors: {
      color: '#1F2329',
    },
  };

  return (
    <NavigationContainer independent={true} theme={customTheme}>
      <Navigation />
    </NavigationContainer>
  );
}