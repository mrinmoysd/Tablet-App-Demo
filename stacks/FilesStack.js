import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {TableNew, PdfViewer} from '../screens';
import {Button} from 'react-native';

const FileStackNav = createStackNavigator();


const FilesStack = () => (
  <FileStackNav.Navigator initialRouteName="TableNew">
      <FileStackNav.Screen name="FileManager" component={TableNew} options={{headerShown:false}} />
      <FileStackNav.Screen name="PdfViewer" component={PdfViewer} />
      {/* <FileStackNav.Screen name="NoData" component={NoData} /> */}
  </FileStackNav.Navigator>
);

export default FilesStack;