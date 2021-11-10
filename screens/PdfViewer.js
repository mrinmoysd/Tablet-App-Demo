import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Pdfreader } from '../components/files/Pdfreader';

import { COLORS, SIZES } from "../constants";

const PdfViewer = ({ route }) => {
    // const { colors } = useAppSelector((state) => state.theme.theme);
    
    const { prevDir, folderName } = route.params;
    // console.log(prevDir)
    const fileExt = folderName.split('/').pop().split('.').pop().toLowerCase();
  
    if (fileExt === 'pdf')
    //   return <Pdfreader fileURI={prevDir + '/' + folderName} />;
      return <Pdfreader fileURI={prevDir} />;
  
    return (
      <View style={{ ...styles.container, backgroundColor: COLORS.background }}>
        <Text style={{ color: COLORS.primary }}>
          This file format is not supported.
        </Text>
      </View>
    );
  };
  
  export default PdfViewer;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: SIZES.padding,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });