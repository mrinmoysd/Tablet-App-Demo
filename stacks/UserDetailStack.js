import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {setDetailsNavigator} from '../navigation/detailsNavigator';

import {Detail, NoData} from '../screens';

const DetailsStack = createStackNavigator();

const UserDetailStack = () => {
    return (
        <NavigationContainer
        independent
        ref={setDetailsNavigator}>
        <DetailsStack.Navigator initialRouteName="NoData">
            <DetailsStack.Screen 
            name="No Data"
            component={NoData} />
            <DetailsStack.Screen 
            name="Detail"
            component={Detail} />
        </DetailsStack.Navigator>
    </NavigationContainer>
    )
}

export default UserDetailStack