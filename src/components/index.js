import React, { Component } from 'react'
import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import LoginCPF from './LoginCPF';
import LoginRA from './LoginRA';
import Home from './Home';
import Cadastro from './Cadastro';
import Senha from './Senha';
import { Button } from 'react-native';

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
      },
      Cadastro: {
        screen: Cadastro,
        navigationOptions:{
          headerTitle: 'Cadastro'
        }
      },
      Senha: {
        screen: Senha,
        navigationOptions:{
          headerTitle: 'Alterar Senha'
        }
      }
  }
)

export default createAppContainer(MainNav);