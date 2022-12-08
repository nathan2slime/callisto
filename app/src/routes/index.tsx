import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FC } from 'react';
import { View } from 'react-native';
import {
  DefaultTheme,
  NavigationContainer,
  Theme as TabTheme,
} from '@react-navigation/native';
import { UITabBar } from '@cars/ui';
import { Theme } from '@cars/themes';
import { useSelector } from 'react-redux';

import Index from '../screens/index';
import Login from '../screens/login/index';
import Signup from '../screens/signup/index';
import Profile from '../screens/profile';

import { APP_STATE } from '../store';
import CreateCar from '../screens/create_car';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

type RoutesProps = {
  theme: Theme;
};

const Routes: FC<RoutesProps> = ({ theme }) => {
  const isAdmin = useSelector((state: APP_STATE) => state.user.data?.admin);

  const screenOptions = {
    headerShown: false,
  };

  const tabTheme: TabTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.backgroundColor,
    },
  };

  const icons: any = {
    Index: {
      active: 'md-car',
      inactive: 'md-car-outline',
    },
    CreateCar: {
      active: 'md-add',
      inactive: 'md-add-outline',
    },
    Account: {
      active: 'md-person',
      inactive: 'md-person-outline',
    },
  };

  if (!isAdmin) {
    delete icons.CreateCar;
  }

  const TabBar = () => (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBar={props => <UITabBar icons={icons} {...props} />}
    >
      <Tab.Screen name="Index" component={Index} />
      <Tab.Screen name="CreateCar" component={CreateCar} />
      <Tab.Screen name="Account" component={Profile} />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer theme={tabTheme}>
      <Stack.Navigator initialRouteName="Tab" screenOptions={screenOptions}>
        <Stack.Screen name="Tab" component={TabBar} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
