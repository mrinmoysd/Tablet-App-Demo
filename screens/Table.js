import React, { useState, useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, PanResponder, Image } from 'react-native';
import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from "lodash"
import { TextIconButton } from "../components";
import { FilterModal } from "./";


const Table = () => {

    const [scrollY,setScrollY]=React.useState(0)
    // const scrollY = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(0);
    const rightRef = useRef(null);

    React.useEffect(() => {
        flatListRef.current?.scrollToOffset({ offset: scrollY, animated: true },0);
        // console.log(scrollY)
    }, handleScroll)

    const handleScroll = (event) => {
        let yOffset=event.nativeEvent.contentOffset.y;
        setScrollY(yOffset)
        }

    const [ columns, setColumns ] = useState([
        "Name",
        "Gender",
        "Breed",
        "Weight",
        "Age",
        "Group"
      ])
      const [offset, setOffset] = React.useState();
    const [ direction, setDirection ] = useState(null)
    const [ selectedColumn, setSelectedColumn ] = useState(null)
    const [showFilterModal, setShowFilterModal] = React.useState(false)
    const [ pets, setPets ] = useState([
    {
        Name: "Charlie",
        Gender: "Male",
        Breed: "Dog",
        Weight: 12,
        Age: 3
    },
    {
        Name: "Max",
        Gender: "Male",
        Breed: "Dog",
        Weight: 23,
        Age: 7
    },
    {
        Name: "Lucy",
        Gender: "Female",
        Breed: "Cat",
        Weight: 5,
        Age: 4
    },
    {
        Name: "Oscar",
        Gender: "Male",
        Breed: "Turtle",
        Weight: 13,
        Age: 23
    },
    {
        Name: "Daisy",
        Gender: "Female",
        Breed: "Bird",
        Weight: 1.7,
        Age: 3
    },
    {
        Name: "Ruby",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 3
    },
    {
        Name: "Milo",
        Gender: "Male",
        Breed: "Dog",
        Weight: 11,
        Age: 7
    },
    {
        Name: "Toby",
        Gender: "Male",
        Breed: "Dog",
        Weight: 34,
        Age: 19
    },
    {
        Name: "Lola",
        Gender: "Female",
        Breed: "Cat",
        Weight: 4,
        Age: 3
    },
    {
        Name: "Jack",
        Gender: "Male",
        Breed: "Turtle",
        Weight: 13,
        Age: 23
    },
    {
        Name: "Bailey",
        Gender: "Female",
        Breed: "Bird",
        Weight: 2,
        Age: 4
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Charlie",
        Gender: "Male",
        Breed: "Dog",
        Weight: 12,
        Age: 3
    },
    {
        Name: "Max",
        Gender: "Male",
        Breed: "Dog",
        Weight: 23,
        Age: 7
    },
    {
        Name: "Lucy",
        Gender: "Female",
        Breed: "Cat",
        Weight: 5,
        Age: 4
    },
    {
        Name: "Oscar",
        Gender: "Male",
        Breed: "Turtle",
        Weight: 13,
        Age: 23
    },
    {
        Name: "Daisy",
        Gender: "Female",
        Breed: "Bird",
        Weight: 1.7,
        Age: 3
    },
    {
        Name: "Ruby",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 3
    },
    {
        Name: "Milo",
        Gender: "Male",
        Breed: "Dog",
        Weight: 11,
        Age: 7
    },
    {
        Name: "Toby",
        Gender: "Male",
        Breed: "Dog",
        Weight: 34,
        Age: 19
    },
    {
        Name: "Lola",
        Gender: "Female",
        Breed: "Cat",
        Weight: 4,
        Age: 3
    },
    {
        Name: "Jack",
        Gender: "Male",
        Breed: "Turtle",
        Weight: 13,
        Age: 23
    },
    {
        Name: "Bailey",
        Gender: "Female",
        Breed: "Bird",
        Weight: 2,
        Age: 4
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Charlie",
        Gender: "Male",
        Breed: "Dog",
        Weight: 12,
        Age: 3
    },
    {
        Name: "Max",
        Gender: "Male",
        Breed: "Dog",
        Weight: 23,
        Age: 7
    },
    {
        Name: "Lucy",
        Gender: "Female",
        Breed: "Cat",
        Weight: 5,
        Age: 4
    },
    {
        Name: "Oscar",
        Gender: "Male",
        Breed: "Turtle",
        Weight: 13,
        Age: 23
    },
    {
        Name: "Daisy",
        Gender: "Female",
        Breed: "Bird",
        Weight: 1.7,
        Age: 3
    },
    {
        Name: "Ruby",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 3
    },
    {
        Name: "Milo",
        Gender: "Male",
        Breed: "Dog",
        Weight: 11,
        Age: 7
    },
    {
        Name: "Toby",
        Gender: "Male",
        Breed: "Dog",
        Weight: 34,
        Age: 19
    },
    {
        Name: "Lola",
        Gender: "Female",
        Breed: "Cat",
        Weight: 4,
        Age: 3
    },
    {
        Name: "Jack",
        Gender: "Male",
        Breed: "Turtle",
        Weight: 13,
        Age: 23
    },
    {
        Name: "Bailey",
        Gender: "Female",
        Breed: "Bird",
        Weight: 2,
        Age: 4
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Charlie",
        Gender: "Male",
        Breed: "Dog",
        Weight: 12,
        Age: 3
    },
    {
        Name: "Max",
        Gender: "Male",
        Breed: "Dog",
        Weight: 23,
        Age: 7
    },
    {
        Name: "Lucy",
        Gender: "Female",
        Breed: "Cat",
        Weight: 5,
        Age: 4
    },
    {
        Name: "Oscar",
        Gender: "Male",
        Breed: "Turtle",
        Weight: 13,
        Age: 23
    },
    {
        Name: "Daisy",
        Gender: "Female",
        Breed: "Bird",
        Weight: 1.7,
        Age: 3
    },
    {
        Name: "Ruby",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 3
    },
    {
        Name: "Milo",
        Gender: "Male",
        Breed: "Dog",
        Weight: 11,
        Age: 7
    },
    {
        Name: "Toby",
        Gender: "Male",
        Breed: "Dog",
        Weight: 34,
        Age: 19
    },
    {
        Name: "Lola",
        Gender: "Female",
        Breed: "Cat",
        Weight: 4,
        Age: 3
    },
    {
        Name: "Jack",
        Gender: "Male",
        Breed: "Turtle",
        Weight: 13,
        Age: 23
    },
    {
        Name: "Bailey",
        Gender: "Female",
        Breed: "Bird",
        Weight: 2,
        Age: 4
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Charlie",
        Gender: "Male",
        Breed: "Dog",
        Weight: 12,
        Age: 3
    },
    {
        Name: "Max",
        Gender: "Male",
        Breed: "Dog",
        Weight: 23,
        Age: 7
    },
    {
        Name: "Lucy",
        Gender: "Female",
        Breed: "Cat",
        Weight: 5,
        Age: 4
    },
    {
        Name: "Oscar",
        Gender: "Male",
        Breed: "Turtle",
        Weight: 13,
        Age: 23
    },
    {
        Name: "Daisy",
        Gender: "Female",
        Breed: "Bird",
        Weight: 1.7,
        Age: 3
    },
    {
        Name: "Ruby",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 3
    },
    {
        Name: "Milo",
        Gender: "Male",
        Breed: "Dog",
        Weight: 11,
        Age: 7
    },
    {
        Name: "Toby",
        Gender: "Male",
        Breed: "Dog",
        Weight: 34,
        Age: 19
    },
    {
        Name: "Lola",
        Gender: "Female",
        Breed: "Cat",
        Weight: 4,
        Age: 3
    },
    {
        Name: "Jack",
        Gender: "Male",
        Breed: "Turtle",
        Weight: 13,
        Age: 23
    },
    {
        Name: "Bailey",
        Gender: "Female",
        Breed: "Bird",
        Weight: 2,
        Age: 4
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    }
    ])

    

    const sortTable = (column) => {
        const newDirection = direction === "desc" ? "asc" : "desc" 
        const sortedData = _.orderBy(pets, [column],[newDirection])
        setSelectedColumn(column)
        setDirection(newDirection)
        setPets(sortedData)
      }

    const renderFilterButton = () => {
    return (
        <View style={{alignSelf: 'flex-end', marginRight: SIZES.base}}>
            <TextIconButton 
            containerStyle={{
                width: '100%',
                height: 50,
                alignItems: 'center',
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.transparent,
            }}
            // icon={icons.bookmark}
            // iconStyle={{
            //     tintColor: COLORS.gray
            // }}
            // iconPosition="LEFT"
            label="Filter"
            labelStyle={{
                
                // marginLeft: SIZES.radius,
                color: COLORS.darkGreen
            }}
            onPress={() => setShowFilterModal(true)}    
        />
        </View>
    )
    }
    const tableHeader = () => (
    
        <View style={styles.tableHeader}>
            {
            columns.map((column, index) => { 
                if(index !== 0) {
                    return (
                    <View style={{flex: 1}}>
                        <TouchableOpacity 
                            key={index}
                            style={styles.columnHeader} 
                            onPress={()=> sortTable(column)}>
                                <Text style={styles.columnHeaderTxt}>{column + " "} 
                            { selectedColumn === column &&
                            <MaterialCommunityIcons 
                                name={direction === "desc" ? "arrow-down-drop-circle" : "arrow-up-drop-circle"} 
                                />
                            }
                            </Text>
                        </TouchableOpacity>
                    </View>
                    )
                }
            })
            }
        </View>
    )

    const leftTableHeader = () => (
    
        <View style={styles.tableHeader}>
            {
            columns.map((column, index) => { 
                if(index === 0) {
                    return (
                    <View style={{flex: 1}}>
                        <TouchableOpacity 
                            key={`header-${index}`}
                            style={styles.columnHeader} 
                            onPress={()=> sortTable(column)}>
                                <Text style={styles.columnHeaderTxt}>{column + " "} 
                            { selectedColumn === column &&
                            <MaterialCommunityIcons 
                                name={direction === "desc" ? "arrow-down-drop-circle" : "arrow-up-drop-circle"} 
                                />
                            }
                            </Text>
                        </TouchableOpacity>
                    </View>
                    )
                }
            })
            }
        </View>
    )
    const renderFilterColumn = ({item, index}) => {
        return (
            <View
                style={{
                ...styles.firstColumnRowTxt, 
                backgroundColor: index % 2 == 1 ? COLORS.white : COLORS.white,
                
                }}
            >
            <Text style={{...styles.firstColumnRowTxt,backgroundColor: COLORS.lightGreen,fontWeight:"bold"}}>{item.Name}</Text>
            </View>
        )
    }

    const renderMainTable = ({item, index}) => {
        return (
            <View
                style={{
                ...styles.tableRow, 
                backgroundColor: index % 2 == 1 ? COLORS.white : COLORS.white,
                
                }}
            >
                {/* <Text style={{...styles.columnRowTxt, backgroundColor: COLORS.lightGreen,fontWeight:"bold"}}>{item.Name}</Text> */}
                <Text style={styles.columnRowTxt}>{item.Gender}</Text>
                <Text style={styles.columnRowTxt}>{item.Breed}</Text>
                <Text style={styles.columnRowTxt}>{item.Weight}</Text>
                <Text style={styles.columnRowTxt}>{item.Age}</Text>
            </View>
        )
    }

    const leftComponent= () => {
        return (
            <Animated.FlatList
                // ref={ref => (flatListRef.current = ref)}
                ref={flatListRef}
                data={pets}
                scrollEnabled={false}
                keyExtractor={(item, index) => index+""}
                style={{width:100}}
                ListHeaderComponent={leftTableHeader}
                stickyHeaderIndices={[0]}
                bounces={false}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                renderItem={renderFilterColumn}
            />
        )
    }

    const renderAllColumn = () => { 
        return(
            <ScrollView
                    horizontal
                    stickyHeaderIndices={[0]}
                    // StickyHeaderComponent={leftRow}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{width: (columns.length < 6 ? SIZES.width : SIZES.width * 2) }}
                >   
                    <Animated.FlatList 
                    // ref={flatListRef}
                        // ref={ref => (flatListRef.current = ref)}
                        data={pets}
                        style={{width:"100%"}}
                        showsVerticalScrollIndicator={false}
                        scrollEventThrottle={16}
                        bounces={false}
                        // onScroll={(event)=>handleScroll(event)}
                        onScroll={(e) => 
                            {
                              let scrollY = e.nativeEvent.contentOffset.y;
                              flatListRef.current?.scrollToOffset({ offset: scrollY, animated: false });
                              console.log('Data scroll event')
                          }}
                        keyExtractor={(item, index) => index+""}
                        ListHeaderComponent={tableHeader}
                        stickyHeaderIndices={[0]}
                        renderItem={renderMainTable}
                    />
                </ScrollView>
        )
    }

    return (
        <View style={{flex: 1}}>

            {/* Filter Section */}
            {showFilterModal && 
                <FilterModal 
                    isVisible={showFilterModal}
                    onClose={() => setShowFilterModal(false)}
                />
            }

            {renderFilterButton()}
        
            <View style={{flexDirection: 'row', paddingVertical: SIZES.base}}>

                {/* first column */}
                {leftComponent()}


                {/* All Column */}
                {renderAllColumn()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop:20,
      paddingBottom: 20,
      marginBottom: 30
    },
    tableHeader: {
      flexDirection: "row",
    //   justifyContent: "space-evenly",
      alignItems: "center",
      backgroundColor: COLORS.darkGreen,
    //   borderTopEndRadius: 10,
    //   borderTopStartRadius: 10,
      height: 50,
      
    },
    tableRow: {
      flexDirection: "row",
    //   height: 40,
      alignItems:"center",
    //   justifyContent: 'center'
    },
    columnHeader: {
      width: "100%",
      justifyContent: "center",
      alignItems:"center",
      borderBottomWidth:1,
      borderRightWidth:1,
      height: 50,
      borderBottomColor: COLORS.lightGray,
      borderRightColor: COLORS.lightGray
    },
    columnHeaderTxt: {
      color: "white",
      fontWeight: "bold"
    },
    columnRowTxt: {
        textAlignVertical: 'center',
        width:"20%",
        textAlign:"center",
        borderBottomWidth:1,
        borderRightWidth:1,
        height: 40,
        borderBottomColor: COLORS.lightGray,
        borderRightColor: COLORS.lightGray
    },
    firstColumnRowTxt: {
        textAlignVertical: 'center',
        width:"100%",
        textAlign:"center",
        borderBottomWidth:1,
        borderRightWidth:1,
        height: 40,
        borderBottomColor: COLORS.lightGray,
        borderRightColor: COLORS.lightGray
    }
  });

export default Table