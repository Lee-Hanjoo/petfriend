import { NavigationContainer } from "@react-navigation/native";
import Navigation from "../Navigation";

export default function Page() {
  return (
    <NavigationContainer independent={true}>
      <Navigation />
    </NavigationContainer>
  );x
}