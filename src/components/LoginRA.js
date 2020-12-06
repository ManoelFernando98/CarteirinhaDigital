import { toDataURL } from 'qrcode';
import React, {Component, useState, useEffect} from 'react';
import { Alert, KeyboardAvoidingView ,Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';



export default class App extends Component{

  
  clicou = () => {
    Alert.alert("Atenção","Digite seu CPF");
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
    if(field == 'RA'){
      this.setState({
        RA: text,
      })
    } else if(field == 'Senha'){
      this.setState({
        Senha: text,
      })
    }
  }

  submit(){
    let collection = {}
    collection.RA = this.state.RA,
    collection.Senha = this.state.Senha
    //console.warn(collection);
    var ra;
    var senha;
    var dadosUsuario;

    if (collection.RA == null || collection.Senha == null ) {
      Alert.alert("Atenção!","Preencha RA e Senha para continuar");
    } else{
      var url = "https://kcontrol-api.herokuapp.com/usuarios/codigo/" + collection.RA; //10.0.2.2
      
      //console.warn(btKit);

      fetch(url)
      .then(res => res.json()) //45589876652
      .then(data => (
        dadosUsuario = data,
        ra = data.usuario[0].codigo,
        senha = data.usuario[0].senha
      ))
      .then(() => {
        //console.warn(collection.RA);
        if(collection.RA == ra && collection.Senha == senha){
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
          this.textInputRA.clear();
          this.textInputSenha.clear();
        }else{
          Alert.alert("Atenção","Houve um problema com o login, verifique suas credenciais!");
        }
      })
      .catch(function(error){
        //console.warn('There has been a problem with your fetch operation:' + error.message)
        Alert.alert("Atenção","Houve um problema com o login, verifique suas credenciais!");
        }
      );
      
      /*fetch(urlDigital)
      .then(res => res.json())
      .then(data => (
        dadosKit = data,
        btKit = data.btKit
      ))
      .then(() => {
        this.props.navigation.navigate('Home',  {
          btKit: dadosKit.btKit  
        }); 
      })*/
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

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          autoCorrect={false}
          placeholder="RA"
          onChangeText={(text) => this.updateValue(text, 'RA')}
          maxLength={6}
          ref={input => { this.textInputRA = input }}
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
  
        <TouchableOpacity onPress={() => {this.props.navigation.navigate('LoginCPF'), this.clicou()}}>
          <Text style={styles.textRA}>Entrar com CPF</Text>
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