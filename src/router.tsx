import React, { useContext, useState } from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Preload from "./pages/Preload/preload-index";
import Login from "./pages/Login";
import Register from "./pages/Register/home-index";
import { TabNavigator } from "./tabroutes";
import AnimalRegister from "./pages/Animals/animalRegister";

export const StackTypes = createStackNavigator();

type StackNavigation = {
  Preload: undefined;
  Login: undefined;
  Register: undefined;
  Tabroutes: undefined;
  AnimalRegister: undefined;
};


export default () => {
  return (
    // <tokenContext.Provider value={context}>
      <StackTypes.Navigator
        initialRouteName="Preload"
        screenOptions={{
          headerShown: false,
        }}
      >
        <StackTypes.Screen name="Preload" component={Preload} />
        <StackTypes.Screen name="Login" component={Login} />
        <StackTypes.Screen name="Register" component={Register} />
        <StackTypes.Screen name="Tabroutes" component={TabNavigator} />
        <StackTypes.Screen name="RegisterAnimal" component={AnimalRegister} />
      </StackTypes.Navigator>
    // </trokenContext.Provider>
  );
};
