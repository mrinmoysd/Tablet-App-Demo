import React from "react";
import {
    View,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { COLORS, FONTS, icons } from "../constants";
import { TabIcon } from "../components";
import {useIsTablet} from '../isTabletContext';
import { MainScreen, Home, Profile } from "../screens";

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel:false,
                style:{
                    position: 'absolute',
                    bottom:0,
                    left:0,
                    right:0,
                    elevation:0,
                    backgroundColor:COLORS.white,
                    borderTopColor:"transparent",
                    height:60
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={MainScreen}
                options={{
                    tabBarIcon:({focused}) => <TabIcon focused={focused} icon={icons.home} />
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon:({focused}) => <TabIcon focused={focused} icon={icons.settings} />
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;