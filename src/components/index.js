import React, { Component } from 'react'
import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import LoginCPF from './LoginCPF';
import LoginRA from './LoginRA';
import Home from './Home';
import Cadastro from './Cadastro';

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
        },
        Cadastro: {
          screen: Cadastro,
          navigationOptions:{
            headerTitle: 'Cadastrar Aluno'
          }
        },
      }
  }
)

export default createAppContainer(MainNav);
