import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import {setMasterNavigator} from './navigation/masterNavigator';
import { NavigationContainer } from '@react-navigation/native';
import {IsTabletContextProvider} from './isTabletContext';

import Tabs from "./navigation/tabs";

const Stack = createStackNavigator();
const MainScreenOptions = {headerShown: false};

const RootStack = () => {
    return(
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
                name="Main"
                component={Tabs}
                options={MainScreenOptions}
            />
        </Stack.Navigator>
    )
}

const App = () => {
    return (
        <IsTabletContextProvider>
            <NavigationContainer ref={setMasterNavigator}>
                <RootStack />
            </NavigationContainer>
        </IsTabletContextProvider>
    )
}

export default App;