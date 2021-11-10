import React from "react";
import { 
    TouchableOpacity,
    Text,
    Image,
    StyleSheet
 } from "react-native";

 import { FONTS, COLORS } from "../constants";

 const TextIconButton = ({
     containerStyle,
     label,
     labelStyle,
     icon,
     iconPosition,
     iconStyle,
     onPress
 }) => {
     return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                ...containerStyle
            }}
            onPress={onPress}
        >
            {iconPosition == "LEFT" && 
                <Image 
                    source={icon}
                    style={{
                        ...styles.image,
                        ...iconStyle
                    }}
                />
            }

            <Text
                style={{
                    ...FONTS.body3,
                    ...labelStyle
                }}
            >
                {label}
            </Text>

            {iconPosition == "RIGHT" && 
                <Image 
                    source={icon}
                    style={{
                        ...styles.image,
                        ...iconStyle
                    }}
                />
            }
        </TouchableOpacity>
     )
 }

 const styles = StyleSheet.create({
     image:{
         marginLeft: 5,
         height: 15,
         width: 15,
         tintColor: COLORS.black
     }
 })

 export default TextIconButton;