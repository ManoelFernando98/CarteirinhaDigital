import React, { Component } from 'react'
import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import LoginCPF from './LoginCPF';
import LoginRA from './LoginRA';
import Home from './Home';

const MainNav = createStackNavigator (
  {
      LoginRA:{
        screen: LoginRA,
        navigationOptions: {
          headerShown: false
          }
        },
        Home: {
          screen: Home,
          navigationOptions:{
            headerTitle: 'Home'
          }
        },
        LoginCPF:{
          screen: LoginCPF,
          navigationOptions: {
          headerShown: false
        }
      }
  }
)

export default createAppContainer(MainNav);
