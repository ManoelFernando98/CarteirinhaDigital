import React, {Component, useState, useEffect} from 'react';
import { Alert, KeyboardAvoidingView ,Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Switch } from 'react-native';
import { State } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text'



export default class App extends React.Component {

  state = {
    switchValue: false,
    switchAdmValue: false
  }


  toggleSwitch = (value) => {
      this.setState({
        switchValue: value,
        switchAdmValue: switchValue
      })
      //console.warn(value);
  }

  toggleSwitchAdm = (value) => {
      this.setState({
        switchAdmValue: value,
        switchValue: switchAdmValue
      })
    //console.warn(value);
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

  submit(){
      //const unmasked = this.unmaskDtNascimento.getRawValue();
      const { params } = this.props.navigation.state;
      const perfil = params ? params.perfil : null;

      let collection = {}
      collection.Nome = this.state.Nome,
      collection.RA = this.state.RA,
      collection.CPF = this.state.CPF,
      collection.Curso = this.state.Curso,
      collection.dtNascimento = this.state.dtNascimento,
      collection.btMonitor = this.state.switchValue,
      collection.btAdm = this.state.switchAdmValue

      //console.warn(this.state.switchAdmValue)

      var btCadastro
      
      if (collection.btMonitor && !collection.btAdm){ //Monitor
        btCadastro = 2;
      }else if((!collection.btMonitor && collection.btAdm) || (collection.btMonitor && collection.btAdm)){ //Master
        btCadastro = 1;
      }else if(!collection.btMonitor && !collection.btAdm){ //Aluno
        btCadastro = 3;
      }

      //console.warn(btCadastro)
      if (collection.Nome == null || collection.RA == null || collection.CPF == null ||collection.Curso == null || collection.dtNascimento == null) {
        Alert.alert("Atenção!","Preencha todos os campos.");
      }else{
        var senha = collection.dtNascimento.replace(/[/]/, "").replace(/[/]/, "")
        var dados;
        var cpfIsValid = this.cpfField.isValid()
        //console.warn(senha);

        if(!cpfIsValid){
          Alert.alert("Atenção!","O CPF digitado é inválido.");
        }else{
        
           fetch('https://kcontrol-api.herokuapp.com/usuarios/', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              nome: collection.Nome,
              codigo: collection.RA,
              senha: senha,
              curso: collection.Curso,
              cpf: collection.CPF,
              dtNascimento: collection.dtNascimento,
              perfil: btCadastro
            })
            })
            .then(res  => {
              dados = res.status;
              if (dados === 201){
                Alert.alert("Cadastrado Realizado!","Aluno cadastrado com sucesso.");
                this.textInputRA.clear();
                this.textInputNome.clear();
                this.textInputCurso.clear();
                this.setState({
                  CPF: '',
                  dtNascimento: '',
                  switchValue: false,
                  switchAdmValue: false
                })
              }
              if(dados === 500) {
                Alert.alert("Atenção!","RA ou CPF já cadastrado.");
            
              }
            })
      }
      //console.warn(btCadastro)
      
      

      //Alert.alert("Atenção!","O cadastro foi efetuado com sucesso.");
      
     }
    
  }
  

  render(){
    const { params } = this.props.navigation.state
    const perfil = params ? params.perfil : null;

    const botaoMonitor = perfil ? perfil == 1  : false;

   
    //console.warn(botaoMonitor);
    //console.warn(perfil);
    return(
      <KeyboardAvoidingView style={styles.background}>
        
        <View style={[styles.container]}>

        <TextInput
          style={styles.input}
          autoCorrect={false}
          placeholder="Nome"
          onChangeText={(text) => this.updateValue(text,'Nome')}
          ref={input => { this.textInputNome = input }}
        />
  
        <TextInput
          style={styles.input}
          placeholder="RA"
          keyboardType="numeric"
          autoCorrect={false}
          maxLength = {6}
          onChangeText = {(text) => this.updateValue(text,'RA')}
          ref={input => { this.textInputRA = input }}
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
          ref={input => { this.cpfField = input }}
        />
               
        <TextInput
          style={styles.input}
          placeholder="Curso"
          autoCorrect={false}
          onChangeText = {(text) => this.updateValue(text,'Curso')}
          ref={input => { this.textInputCurso = input }}
        />

        <TextInputMask
          type={'datetime'}
          options={{
            format:'DD/MM/YYYY'
          }}
          value={this.state.dtNascimento}
          style={styles.input}
          placeholder="Data de Nascimento"
          keyboardType="numeric"
          autoCorrect={false}
          maxLength = {10}
          onChangeText = {(text) => this.updateValue(text, 'dtNascimento')}
          ref={input=> {this.datetimeField = input}}
        />

        
  
        {
          botaoMonitor
          ?
          <View>
          <View>
          <Text style={styles.textoMonitor}>Monitor</Text>

          <Switch
           style={styles.switch}
           value = {this.state.switchValue} 
           onValueChange = {(switchValue)=>this.setState({switchValue})}
          />
          </View>

          <View>
            <Text style={styles.textoMonitor}>Master</Text>

            <Switch
            style={styles.switchAdministrador}
            value = {this.state.switchAdmValue} 
            onValueChange = {(switchAdmValue)=>this.setState({switchAdmValue})}
            />
          </View>
          </View>
          :
          false
        }
        
        

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
    fontSize: 25,
    fontWeight: 'bold',
    color: '#3D9CF5',
    alignItems: 'center',
    marginTop: 10,
  },
  logo:{
    width: 150,
    height: 100,
    marginTop: -70,
    borderRadius: 10
  },
  input:{
    borderColor: '#558E9E',
    width: '90%',
    marginBottom: 15,
    fontSize: 14,
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
    backgroundColor: '#558E9E',
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
    color: '#558E9E',
    fontWeight: 'bold',
    marginBottom: -30,
    marginRight: 250
  },
  switch:{
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 280,
    marginBottom:10
  },
  textoAdministrador:{
    fontSize: 20,
    color: '#558E9E',
    fontWeight: 'bold',
    marginBottom: -10,
    marginRight: 250
  },
  switchAdministrador:{
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 280,
    marginBottom:20
  },

});