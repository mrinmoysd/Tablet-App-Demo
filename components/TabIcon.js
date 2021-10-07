import { TabActions } from "@react-navigation/routers";
import React from "react";
import {
    View,
    Image
} from 'react-native';

import { COLORS } from "../constants";

const TabIcon = ({focused, icon}) => {
    return(
        <View
            style={{
                alignItems:'center',
                justifyContent:'center',
                height:50,
                width:50
            }}
        >
            <Image
            source={icon}
            resizeMode="contain"
            style={{
                width:25,
                height:25,
                tintColor:focused ? COLORS.darkGreen : COLORS.lightLime
            }}
            />

            {focused &&
                <View
                style={{
                    position:'absolute',
                    left:0,
                    right:0,
                    bottom:-5,
                    height:5,
                    borderTopLeftRadius:5,
                    borderTopRightRadius:5,
                    backgroundColor:COLORS.darkGreen
                }}
                >

                </View>
            }
        </View>
    )
}

export default TabIcon;