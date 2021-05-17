import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TopTen from "./components/TopTen";
import Alerts from "./components/Alerts";
import HomeScreen from "./components/HomeScreen";
import ConvertCrypto from "./components/ConvertCrypto";
import { Ionicons } from "@expo/vector-icons"; // import icons from Expo



const Tab = createBottomTabNavigator();

function App() {



  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // Navigator can be customized using screenOptions
          tabBarIcon: ({ focused, color, size }) => {
            // Function tabBarIcon is given the focused state,
            // color and size params
            let iconName;
            if (route.name === "My crypto") {
              iconName = "logo-bitcoin";
            } else if (route.name === "Top") {
              iconName = "analytics";
            } else if (route.name === "Convert") {
              iconName = "cash-outline";
            }else if (route.name === "Alerts") {
              iconName = "md-alert-circle-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />; //it returns an icon component
          },
        })}
      >
        <Tab.Screen name="My crypto" component={HomeScreen} />
        <Tab.Screen name="Top" component={TopTen} />
        <Tab.Screen name="Convert" component={ConvertCrypto} />
        <Tab.Screen name="Alerts" component={Alerts} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
