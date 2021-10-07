import React , {useEffect} from 'react';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    TextInput,
    FlatList,
    TouchableOpacity
} from 'react-native';

import {
    isDetailsNavigatorMounted,
    detailsPush,
    detailsNavigate,
  } from '../navigation/detailsNavigator';
  import {push} from '../navigation/masterNavigator';

import { FONTS, COLORS, SIZES, icons, images, dummyData } from "../constants";

import { CategoryCard } from "../components";
import {useIsTablet} from '../isTabletContext';


const pushChatScreen = ({item}) => {
    const args = ['Detail', {item}];
  
    if (isDetailsNavigatorMounted()) {
      return detailsNavigate(...args);
    }
  
    return push(...args);
  };

const Home = ({ navigation }) => {
    const [value, setValue] = useIsTablet();

    useEffect(() => {
        setValue(SIZES.isSmallDevice)
    })
    function renderHeader() {
        return(
            <View
            style={{
                flexDirection:'row',
                marginHorizontal:SIZES.padding,
                alignItems:'center',
                height:80
            }}
            >
                {/* Text */}
                <View
                style={{
                    flex:1
                }}
                >
                    <Text
                        style={{
                            color:COLORS.darkGreen,
                            ...FONTS.h2
                        }}
                    >
                        Hello John,
                    </Text>
                    <Text
                    style={{
                        marginTop:3,
                        color:COLORS.gray,
                        ...FONTS.body3
                    }}
                    >
                        What are you today?
                    </Text>
                </View>

                {/* Image*/}
                <TouchableOpacity
                onPress={() => console.log("Profile")}
                >
                    <Image 
                    source={images.UserProfile1}
                    style={{
                        width:40,
                        height:40,
                        borderRadius:20
                    }}
                    />
                </TouchableOpacity>

            </View>
        )
    }

    function renderSearchBar() {
        return(
            <View
                style={{
                    flexDirection:'row',
                    height:50,
                    alignItems:'center',
                    marginHorizontal:SIZES.padding,
                    paddingHorizontal:SIZES.radius,
                    borderRadius:20,
                    backgroundColor:COLORS.lightGray
                }}
            >
                <Image
                source={icons.search}
                style={{
                    width:20,
                    height:20,
                    tintColor:COLORS.gray
                }}
                />
                <TextInput
                style={{
                    marginLeft: SIZES.radius,
                    ...FONTS.body2
                }}
                placeholderTextColor={COLORS.gray}
                placeholder="Search List"
                />
            </View>
        )
    }

    return (
       <SafeAreaView
       style={{
           flex:1,
           backgroundColor:COLORS.white
       }}
       >
           <FlatList
            data={dummyData.categories}
            keyExtractor={item => `${item.id}`}
            keyboardDismissMode='on-drag'
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
                <View>
                    {/* Header */}
                    {renderHeader()}
                    {/* Search Bar */}
                    {renderSearchBar()}
                </View>
            }
            renderItem={({item}) =>{
                // const onPress = () => pushChatScreen({userId});
                return(
                    <CategoryCard
                    containerStyle={{
                        marginHorizontal: SIZES.padding
                    }}
                    categoryItem={item}
                    // onPress={() => navigation.navigate ("Detail", {recipe : item})}
                    onPress={() => pushChatScreen({item})}
                    />
                )
            }}
            ListFooterComponent={
                <View 
                style={{
                    marginBottom:100
                }}
                />
            }
           >

           </FlatList>
       </SafeAreaView>
    )
}

export default Home;