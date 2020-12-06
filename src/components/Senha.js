import React, {Component, useState, useEffect} from 'react';
import { Alert, KeyboardAvoidingView ,Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Switch } from 'react-native';

export default class App extends React.Component {
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
        if(field == 'Senha'){
          this.setState({
            Senha: text,
          })
        } else if(field == 'SenhaConfirmada'){
          this.setState({
            SenhaConfirmada: text,
          })
        }
      }

      submit(){
        const { params } = this.props.navigation.state
        const ra = params ? params.ra : null;
        const id = params ? params.id : null;


        let collection = {}
        collection.Senha = this.state.Senha,
        collection.SenhaConfirmada = this.state.SenhaConfirmada
        //console.warn(collection);

    
        if (collection.Senha == null || collection.SenhaConfirmada == null ) {
          Alert.alert("Atenção!","Preencha os dois campos para continuar");
        } 
        
        if (collection.Senha == collection.SenhaConfirmada){

            var dados;

            fetch('https://kcontrol-api.herokuapp.com/usuarios/' + id , {
                method: 'PATCH',
                headers:  {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                  [
                    {
                      "propName" : "senha",
                      "value" : collection.Senha
                    }
                  ]
                  )
            }).then(res  => {
                dados = res.status;
                if (dados === 200){
                  Alert.alert("Senha Atualizada!","Sua senha foi alterada com sucesso.");
                  this.textInputSenhaConfirmada.clear();
                  this.textInputSenha.clear();
                }
                if(dados === 500) {
                  Alert.alert("Atenção!","Houve um problema para alterar a senha. Tente novamente mais tarde.");
              
                }
              })
        }
        else{
            Alert.alert("Atenção!", "As senhas precisam ser iguais. Verifique novamente.");
        }
      }

    render(){


        return(
        <KeyboardAvoidingView style={styles.background}>
            <View style={[styles.container]}>
               

                
                <TextInput {...this.props}
                    style={styles.input}
                    secureTextEntry={this.state.secureTextEntry}
                    placeholder="Nova Senha"
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

                

               
                <TextInput {...this.props}
                    style={styles.input}
                    secureTextEntry={this.state.secureTextEntry}
                    placeholder="Confirmar Senha"
                    keyboardType="numeric"
                    autoCorrect={false}
                    onChangeText = {(text) => this.updateValue(text, 'SenhaConfirmada')}
                    maxLength={8}
                    ref={input => { this.textInputSenhaConfirmada = input }}
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
                    <Text style={styles.botaoText}>Confirmar</Text>
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
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width:'90%'
      },
    containerSenha:{
      height: '9%',
      marginLeft: '79%'
    },
    senha:{
      width: 30,
      height: 30
    },
  
    input:{
      borderColor: '#558E9E',
      width: '90%',
      fontSize: 17,
      borderRadius: 10,
      padding: 10,
      height: 42,
      backgroundColor: '#fff',
      borderWidth: 1,
      fontWeight: 'bold',
      marginBottom: '-10%'
    },
    botao: {
      width:'90%',
      height: 42,
      backgroundColor: '#558E9E',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    botaoText:{
      fontSize: 25,
      fontWeight: 'bold',
      color:'#fff'
    },
  });