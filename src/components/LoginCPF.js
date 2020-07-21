import React, {Component, useState, } from 'react';
import { Alert, KeyboardAvoidingView ,Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Redirect } from 'react-router-native';
import axios from 'axios';


export default class LoginCPF extends React.Component{
 /* CPF = useState('')
  setCPF  = useState('')
  password  = useState('')
  setPassword  = useState('')

sendCred = () =>{
  fetch("http://10.0.2.2:3030/usuarios/",{
    method:"POST",
    headers: {
     'Content-Type': 'application/json'
   },
   body:JSON.stringify({
     "codigo":CPF,
     "senha":password
   })
  })
  .then(res=>res.json())
  .then(()=>{
         try {
           props.navigation.replace("Home")
         } catch (e) {
          Alert.alert("Atenção!","CPF ou senha inválidos.");
         }
  })
} */

  clicou = () => {
    Alert.alert("Atenção","Digite seu RA");
  }

  constructor(props) {
    super(props);
    this.state = {
        data: []
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

  /*getLogin = async() => {
    let collection = {}
    collection.CPF = this.state.CPF,
    collection.Senha = this.state.Senha
    //console.warn(collection);
    let cpf;
    if (collection.CPF.length == 0) 
      Alert.alert("Atenção!","Preencha CPF e senha para continuar");
    else{
      let res = await axios.get("http://localhost:3030/usuarios/cpf" + "/" + collection.CPF,{
        params:{
          cpf: cpf,
        }
      });
    setLogin(res.data);
    console.warn(cpf);
    }
    
  }*/


  submit(){
    let collection = {}
    collection.CPF = this.state.CPF,
    collection.Senha = this.state.Senha
    //console.warn(collection);
    var cpf;
    var senha;

    if (collection.CPF == null || collection.Senha == null ) {
      Alert.alert("Atenção!","Preencha CPF e Senha para continuar");
    } else{
      var url = "http://10.0.2.2:3030/usuarios/cpf/45589876652";
      fetch(url)
      .then(res => res.json())
      .then(data => cpf = data.usuario[0].cpf)
      .then(() => {
        if(collection.CPF == cpf ){
          this.props.navigation.navigate('Home');
        }else{
          Alert.alert("Atenção","Houve um problema com o login, verifique suas credenciais!");
        }
      })
      .catch(function(error){
        console.warn('There has been a problem with your fetch operation:' + error.message)
      }
      );
      //console.warn(cpf);
      //console.warn(cpf);
     
    }


    
   }

    

  /*handleSignInPress = () => {

    if (this.state.CPF.length == 0 || this.state.Senha.length == 0) {
      Alert.alert("Atenção!","Preencha CPF e senha para continuar");
    } else{
      fetch("http://10.0.2.2:3030/usuarios" + + "/" + CPF)
      .then( res => res.json())
      .then( res => {
        this.setState({
          cpf: res.CPF.cpf,
          senha: res.CPF.senha,
        })
        if(response.cpf == CPF && response.senha == Senha)
          this.props.navigation.navigate('Home');
        else
          Alert.alert("Atenção","Houve um problema com o login, verifique suas credenciais!");
      })
    }

    /*
     */   
        

    
  
  render(){
    

    return(
      <KeyboardAvoidingView style={styles.background}>
        <View style={styles.containerLogo}>
          <Image
            style={[ styles.logo]}
            source ={require('../components/LogoCarteirinha.png')}
          />
        <Text style={styles.texto}> Carteirinha Digital </Text> 
        </View>
  
        <View style={[ styles.container]}>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          autoCorrect={false}
          placeholder="CPF"
          onChangeText={(text) => this.updateValue(text,'CPF')}
        />
  
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Senha"
          keyboardType="numeric"
          autoCorrect={false}
          onChangeText={(text) => this.updateValue(text,'Senha')}
        />
  
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
    width: 250,
    height: 190,
    marginTop: 80,
    borderRadius: 10
  },
  input:{
    borderColor: 'navy',
    width: '90%',
    marginBottom: 15,
    fontSize: 17,
    borderRadius: 10,
    padding: 10,
    marginTop: -10,
    height: 42,
    backgroundColor: '#fff',
    borderWidth: 1,
    fontWeight: 'bold',
  },
  botao: {
    width:'90%',
    height: 42,
    backgroundColor: '#3D9CF5',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -10
  },
  botaoText:{
    fontSize: 25,
    fontWeight: 'bold',
    color:'#fff'
  },
  textRA:{
    fontSize: 25,
    fontWeight: 'bold',
    color: '#3D9CF5',
    marginTop: 5
  }
});