import Navigation from "@/Navigation";
import { NavigationContainer } from "@react-navigation/native";


export default function HomeScreen() {
  
  return (
    <NavigationContainer independent={true}>
      <Navigation />
    </NavigationContainer>
  );
}
