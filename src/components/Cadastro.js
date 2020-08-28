import React, {Component, useState, useEffect} from 'react';
import { Alert, KeyboardAvoidingView ,Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Switch } from 'react-native';
import { State } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text'
import { Value } from 'react-native-reanimated';


export default class App extends React.Component {

state = {switchValue:false}

  toggleSwitch = (value) => {
        this.setState({switchValue: value})
        console.warn(value);
  }
  
  clicou = () => {
    //console.warn(state);
    Alert.alert("Atenção!","Preencha todos os campos.");
  }

  constructor(props) {
    super(props);
    this.state = {
        data: []
    };
  }

  updateValue (text, field)  {
    if(field == 'Nome'){
      this.setState({
        Nome: text,
      })
    } else if(field == 'RA'){
      this.setState({
        RA: text,
      })
    }else if(field == 'CPF'){
      this.setState({
        CPF: text,
      })
    }else if(field == 'Curso'){
      this.setState({
        Curso: text,
      })
    }else if(field == 'dtNascimento'){
      this.setState({
        dtNascimento: text,
      })
    }
  }

  unmask(){
    const dtNascimentoUnmask = this.dtNascimento.getRawValue();
  }

  submit(){
    try{
      let collection = {}
      collection.Nome = this.state.Nome,
      collection.RA = this.state.RA,
      collection.CPF = this.state.CPF,
      collection.Curso = this.state.Curso,
      collection.dtNascimento = this.state.dtNascimento,
      collection.btMonitor = this.state.switchValue
      console.warn(this.state.dtNascimento)
      if (collection.Nome == null || collection.RA == null || collection.CPF == null ||collection.Curso == null ) {
        Alert.alert("Atenção!","Preencha todos os campos.");
      }else{
        fetch('http://10.0.2.2:3030/usuarios/', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: collection.Nome,
          codigo: collection.RA,
          senha: collection.dtNascimento,
          curso: collection.Curso,
          cpf: collection.CPF,
          dtNascimento: collection.dtNascimento,
          btAdm: collection.btMonitor
        })
      });
      Alert.alert("Atenção!","O cadastro foi efetuado com sucesso.");
     }
    }catch{
      Alert.alert("Atenção","Houve um problema de conexão!");
    }
  }
  /*fetch('https://mywebsite.com/endpoint/', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    firstParam: 'yourValue',
    secondParam: 'yourOtherValue'
  })
});*/
  

  render(){
    return(
      <KeyboardAvoidingView style={styles.background}>
        
        <View style={[styles.container]}>

        <TextInput
          style={styles.input}
          autoCorrect={false}
          placeholder="Nome"
          onChangeText={(text) => this.updateValue(text,'Nome')}
        />
  
        <TextInput
          style={styles.input}
          placeholder="RA"
          keyboardType="numeric"
          autoCorrect={false}
          maxLength = {6}
          onChangeText = {(text) => this.updateValue(text,'RA')}
        />
  
        <TextInputMask
          type={'cpf'}
          value={this.state.CPF}
          style={styles.input}
          placeholder="CPF"
          keyboardType="numeric"
          autoCorrect={false}
          maxLength = {14}
          onChangeText = {(text) => { this.updateValue(text, 'CPF')}}
        />
               
        <TextInput
          style={styles.input}
          placeholder="Curso"
          autoCorrect={false}
          onChangeText = {(text) => this.updateValue(text,'Curso')}
        />

        <TextInputMask
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY'
          }}
          
          value={this.state.dtNascimento}
          style={styles.input}
          placeholder="Data de Nascimento"
          keyboardType="numeric"
          autoCorrect={false}
          maxLength = {10}
          onChangeText = {(text) => this.updateValue(text, 'dtNascimento')}
        />

        <Text style={styles.textoMonitor}>Monitor</Text>
        
        <Switch
         style={styles.switch}
         value = {this.state.switchValue}
         onValueChange = {(switchValue)=>this.setState({switchValue})}
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={() => {this.submit()}}
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
    marginTop: 80
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
    marginBottom: -30,
    marginRight: 250
  },
  switch:{
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 280,
    marginBottom:20
  }

});