import React, {Component, useState, useEffect} from 'react';
import { Alert, KeyboardAvoidingView ,Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Switch } from 'react-native';


export default class App extends React.Component{
  state = {switchValue:false}
     toggleSwitch = (value) => {
      this.setState({switchValue: value})
   }
  
  clicou = () => {
    Alert.alert("Atenção!","Preencha todos os campos.");
  }

  

  render(){
    return(
      <KeyboardAvoidingView style={styles.background}>
        <View style={styles.containerLogo}>
          <Image
            style={[styles.logo]}
            source ={require('../components/LogoCarteirinha.png')}
          />
        <Text style={styles.texto}> Carteirinha Digital </Text> 
        </View>
  
        <View style={[styles.container]}>

        <TextInput
          style={styles.input}
          autoCorrect={false}
          placeholder="Nome"
          onChangeText={() => {}}
        />
  
        <TextInput
          style={styles.input}
          placeholder="RA"
          keyboardType="numeric"
          autoCorrect={false}
          maxLength = {6}
          onChangeText = {() => {}}
        />
  
        <TextInput
          style={styles.input}
          placeholder="CPF"
          keyboardType="numeric"
          autoCorrect={false}
          maxLength = {11}
          onChangeText = {() => {}}
        />
               
        <TextInput
          style={styles.input}
          placeholder="Curso"
          autoCorrect={false}
          onChangeText = {() => {}}
        />

        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento"
          keyboardType="numeric"
          autoCorrect={false}
          maxLength = {8}
          onChangeText = {() => {}}
        />

        <Text style={styles.textoMonitor}>Monitor</Text>
        
        <Switch
         style={styles.switch}
         onValueChange = {this.toggleSwitch}
         value = {this.state.switchValue}
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={() => {this.props.navigation.navigate('Home'), this.clicou()}}
        >
          <Text style={styles.botaoText}>Cadastrar</Text>
        </TouchableOpacity>
    
        </View>
        </KeyboardAvoidingView>
      )
  }
}

const styles = StyleSheet.create({
  background:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0000'
  },
  containerLogo:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -50
  },
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width:'90%',
    paddingBottom: 50,
    marginTop: -60
  },
  texto:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3D9CF5',
    alignItems: 'center',
    marginTop: -10,
  },
  logo:{
    width: 150,
    height: 100,
    marginTop: -70,
    borderRadius: 10
  },
  input:{
    borderColor: 'navy',
    width: '90%',
    marginBottom: 15,
    fontSize: 17,
    borderRadius: 10,
    padding: 10,
    marginTop: -8,
    height: 38,
    backgroundColor: '#fff',
    borderWidth: 1,
    fontWeight: 'bold',
  },
  botao:{
    width:'90%',
    height: 38,
    backgroundColor: '#3D9CF5',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -10,
    marginBottom: 30
  },
  botaoText:{
    fontSize: 25,
    fontWeight: 'bold',
    color:'#fff'
  },
  textoMonitor:{
    fontSize: 20,
    color: '#3D9CF5',
    fontWeight: 'bold',
    marginBottom: -10,
    marginRight: 250,
  },
  switch:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 280,
    marginBottom:30
  }

});