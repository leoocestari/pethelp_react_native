import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from the appropriate library
import { createDrawerNavigator } from "@react-navigation/drawer"; // Import Drawer Navigator

import Home from "./pages/home/home-index";
import { log } from "console";
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator(); // Define Drawer Navigator


export const TabNavigator = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          switch (route.name) {
            case "home":
              iconName = "home";
              break;
            case "Search":
              iconName = "search";
              break;
            case "Add":
              iconName = "add";
              break;
            case "Calendar":
              iconName = "calendar";
              break;
            case "Profile":
              iconName = "person";
              break;
            default:
              iconName = "home";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="Search" component={Home} />
      <Tab.Screen name="Add" component={Home} />
      <Tab.Screen name="Calendar" component={Home} />
      <Tab.Screen name="Profile" component={Home} />
    </Tab.Navigator>
);


// export default () => (
//   <Drawer.Navigator>
//         <Drawer.Screen name="Home" component={TabNavigator} />
//   </Drawer.Navigator>
// );