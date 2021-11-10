import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';

export const Pdfreader = ({ fileURI }) => {
    const source = {uri:fileURI};
    console.log(fileURI)
  return (
    //   <View><Text>{fileURI}</Text></View>
    <View style={styles.container}>
    <Pdf
      source={{uri:fileURI,cache:true}}
      onLoadComplete={(numberOfPages,filePath)=>{
        console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page,numberOfPages)=>{
            console.log(`current page: ${page}`);
        }}
        onError={(error)=>{
            console.log(error);
        }}
        onPressLink={(uri)=>{
            console.log(`Link presse: ${uri}`)
            
        }}  
        style={styles.pdf}
    />
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});