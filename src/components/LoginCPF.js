import React, {Component, useState, } from 'react';
import { Alert, KeyboardAvoidingView ,Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'

export default class LoginCPF extends React.Component{

  clicou = () => {
    Alert.alert("Atenção","Digite seu RA");
  }

  exibirSenha = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry
  });
  }

  constructor(props) {
    super(props);
    this.state = {
        data: [],
        secureTextEntry: true
    };
  }

  updateValue (text, field)  {
    if(field == 'CPF'){
      this.setState({
        CPF: text,
      })
    } else if(field == 'Senha'){
      this.setState({
        Senha: text,
      })
    }
  }

  submit(){
    let collection = {}
    collection.CPF = this.state.CPF,
    collection.Senha = this.state.Senha
    //console.warn(collection);
    var senha;
    var dadosUsuario;
    var dados;
    var usuario;
    //console.warn(collection.CPF);
    if (collection.CPF == null || collection.Senha == null ) {
      Alert.alert("Atenção!","Preencha CPF e Senha para continuar");
    } else{
      var url = "https://kcontrol-api.herokuapp.com/usuarios/cpf/" + collection.CPF;
      
      fetch(url)
      .then(res => res.json())
      .then(data => (
        dadosUsuario = data,
        usuario = data.usuario
      ))
      .then( () => {
        if(usuario.length == 0){
          Alert.alert("Atenção","Houve um problema com o login, verifique suas credenciais!");
        }else{
          if(usuario[0].cpf == collection.CPF && usuario[0].senha == collection.Senha){
            this.props.navigation.navigate(
              'Home',  {
                id: dadosUsuario.usuario[0]._id,
                nome: dadosUsuario.usuario[0].nome,  
                ra: dadosUsuario.usuario[0].codigo,  
                curso: dadosUsuario.usuario[0].curso,  
                perfil: dadosUsuario.usuario[0].perfil, 
                url: dadosUsuario.usuario[0].url,   
                btKit:dadosUsuario.usuario[0].btKit
            });
            this.textInputSenha.clear();
            this.setState({
              CPF: ''
            })
          }else{
            Alert.alert("Atenção","Houve um problema com o login, verifique suas credenciais!");
          }
        }
      })
      //console.warn(cpf);
      //console.warn(cpf);
     
    }
  }

  render(){
    return(
      <KeyboardAvoidingView style={styles.background}>
        <View style={styles.containerLogo}>
          <Image
            style={[ styles.logo]}
            source ={require('../components/e_digital.png')}
          />
        </View>
  
        <View style={[ styles.container]}>

        <TextInputMask
          type={'cpf'}
          value={this.state.CPF}
          style={styles.input}
          keyboardType="numeric"
          autoCorrect={false}
          placeholder="CPF"
          onChangeText={(text) => this.updateValue(text,'CPF')}
          maxLength={14}
          ref={input => { this.textInputCPF = input }}
        />
  
        <TextInput {...this.props}
          style={styles.input}
          secureTextEntry={this.state.secureTextEntry}
          placeholder="Senha"
          keyboardType="numeric"
          autoCorrect={false}
          onChangeText = {(text) => this.updateValue(text, 'Senha')}
          maxLength={8}
          ref={input => { this.textInputSenha = input }}
        />
  
      <View style={styles.containerSenha}>
        <TouchableOpacity onPress={() => {this.exibirSenha()}}>
          <Image
            style={[ styles.senha]}
            source ={require('../components/senha.png')}
          />
        </TouchableOpacity>
        </View>
       
 
        <TouchableOpacity
          style={styles.botao}
          onPress={() => {this.submit()}}
        >
          <Text style={styles.botaoText}>Login</Text>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={() => {this.props.navigation.navigate('LoginRA'), this.clicou()}}>
          <Text style={styles.textRA}>Entrar com RA</Text>
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
  containerSenha:{
    height: '20%',
    marginLeft: '79%',
    marginBottom: '5%',
    marginTop: '-10%'
  },
  senha:{
    width: 30,
    height: 30
  },
  containerLogo:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width:'90%',
    paddingBottom: 50,
    marginTop: 150
  },
  texto:{
    fontSize: 40,
    fontWeight: 'bold',
    color: '#3D9CF5',
    alignItems: 'center',
    marginTop: -25
  },
  logo:{
    width: 280,
    height: 250,
    marginTop: 110,
    borderRadius: 10
  },
  input:{
    borderColor: '#558E9E',
    width: '90%',
    fontSize: 17,
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    height: 42,
    backgroundColor: '#fff',
    borderWidth: 1,
    fontWeight: 'bold',
  },
  botao: {
    width:'90%',
    height: 42,
    backgroundColor: '#558E9E',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5
  },
  botaoText:{
    fontSize: 25,
    fontWeight: 'bold',
    color:'#fff'
  },
  textRA:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#558E9E',
    marginTop: 5
  }
});