import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Home, Detail, NoData} from '../screens';
import {Button} from 'react-native';

const MasterStack = createStackNavigator();


const MasterMessageStack = () => (
  <MasterStack.Navigator initialRouteName="Home">
      <MasterStack.Screen name="Home" component={Home} />
      <MasterStack.Screen name="Detail" component={Detail} />
      <MasterStack.Screen name="NoData" component={NoData} />
  </MasterStack.Navigator>
);

export default MasterMessageStack;