import React, { Component, useState } from 'react'
import { Alert, Image, Text, StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import LoginCPF from './LoginCPF';
import ImagePicker from 'react-native-image-picker';
import TouchID from 'react-native-touch-id';

const QRCodeSize = Dimensions.get("window").width * 0.70;
const options = {
  title: 'Escolha sua foto'
}

export default class Home extends React.Component { 

  constructor(props){
    super(props);
    this.state={
      avatarSource: null,
      pic: null,
      supported: null,
      setSupported: null,
    }
  }

  /*clicou = () => {
    //Alert.alert("Sobre","Desenvolvedores:\n Daniel Alexandre Carneiro\n Manoel Fernando T. Lopes Conceição \n Thomas Tavares Dias ");
  }*/

  handleLogin = () => {
    const { params } = this.props.navigation.state
    const ra = params ? params.ra : null;
    const id = params ? params.id : null;
    const idDigital = true;
    
   /* TouchID.isSupported()
    .then(sucesso => {
      setSupported(true);
    })
    .catch((error)=>{
      console.log("Erro Touch" + error);
    })*/
    const configs = {
      title: 'Validando aluno',
      sensorDescription: 'Utilize a digital para retirar seu kit',
      color: '#FF0000',
      sensorErrorDescription: 'Touch ID inválido',
    }
    TouchID.authenticate("", configs)
    .then(sucesso =>{
      console.log('Sucesso :D')
      // envio do resultado p API aqui
      //const idDigital = true;
      //console.warn(idDigital);
      Alert.alert("Atenção", "Digital reconhecida. Verifique seu kit com o monitor.");
      fetch('https://kcontrol-api.herokuapp.com/usuarios/' + id , {
        method: 'PATCH',
        headers:  {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          [
            {
              "propName" : "btDigital",
              "value" :true
            }
          ]
          )
        })

    })
    .catch(erro =>{
      console.log('Falha na validacao');
    })

   
  }
  
  adicionarFoto = () => {
    const { params } = this.props.navigation.state
    const ra = params ? params.ra : null;
    const url = params ? params.url : null;
    const id = params ? params.id : null;
    
    

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      }
      else {
        
        let codigo = this.ra;
        let source = { uri :  response.uri };
        const photoName = source.uri; 
        const urlA = url; 
        //console.warn(photoName);
        
        //console.warn(this.state.avatarSource);
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        
        this.setState({
          avatarSource: urlA,
          pic:response.data
        });

        
        fetch('https://kcontrol-api.herokuapp.com/usuarios/' + id , {
        method: 'PATCH',
        headers:  {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          [
            {
              propName: "url",
              value: photoName
            }
          ]
        )
        })
        
        /*
        var urlAPI;
        var dadosUsuario;
        fetch('http://localhost:3030/usuarios/codigo/' + ra)
        .then(res => res.json())
        .then(data => (
          dadosUsuario = data,
          urlAPI = data.usuario[0].url
        ))
        .then(() => {
          urlAPI = dadosUsuario.usuario[0].url
        })
        
        */
       
        Alert.alert("Atenção!","O cadastro da foto foi efetuado com sucesso. Saia do aplicativo e entre novamente para atualizar a foto!");
        
      }
    });
  }

  render(){
    const { params } = this.props.navigation.state;
    const nome = params ? params.nome : null;
    const btAdm = params ? params.btAdm : null;
    const ra = params ? params.ra : null;
    const curso = params ? params.curso : null;
    const url = params ? params.url : null;
    const btKit = params ? params.btKit : null;

    //const raString = ra ? ra.toString() : "";

    //console.warn(url);
	  return (
        <View style={styles.background}>  

        { url
          ?
          <View style={styles.containerFoto} >
          <TouchableOpacity onPress={() => {this.adicionarFoto()}} >
          <Image
            style={[styles.foto]}
            source ={{uri: url}}
          />
          </TouchableOpacity>
          </View>
          :
          <View style={styles.containerFoto}>
          <TouchableOpacity onPress={() => {this.adicionarFoto()}} >
          <Image
            style={[styles.foto]}
            source ={require('../components/logoPersonagem.png')}
          />
          </TouchableOpacity>
          </View>
        }

          <View style={styles.containerNome}>
            <Text style={styles.textNome}>
              {nome} {'\n'}
              {ra} {'\n'}
              {curso} {'\n'}
            </Text>
          </View>

          <View style={styles.containerQRCode}>
          <QRCode
            style={styles.QRCode}
            value= {ra ? ra.toString() : "Indefined"}
            size={QRCodeSize}
            backgroundColor="white"
            color="black"
          />
          </View>

          {
            btKit
            ?
            <View style={[styles.sobreContainer]}>
              <TouchableOpacity onPress={() => {this.handleLogin()}}>
              <Image
                style={[styles.sobre]}
                source ={require('../components/digital.png')}
              />
              </TouchableOpacity>
            </View>
            :
            <View style={[styles.sobreContainer]}>
              <View style={[styles.sobre]}>
              
              </View>
            </View>
          }
          

          {
            btAdm
            ?
            <View style={[styles.containerCadastro]}>
              <TouchableOpacity onPress={() => {this.props.navigation.navigate('Cadastro')}}>
              <Image
              style={[styles.cadastro]}
              source = {require('../components/Cadastro.png')}
              />
            </TouchableOpacity>
            </View>
            :
            <View style={[styles.containerCadastro]}>
              <View style={[styles.cadastro]}>
              </View>  
            </View>
          }
          
        

      </View>
  );
  }
}


const styles = StyleSheet.create({
  background:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#558E9E'
  },
  foto:{
    width: '40%',
    height: 170,
    marginTop: 40,
    borderRadius: 30
  },
  cadastro:{
    //flex: 1,
    width: '53%',
    height: '36%'
  },
  containerCadastro:{
    width: '30%',
    height: '65%',
    marginRight: '56%',
    marginBottom: '-105%',
    marginTop: '-10%'
  },
  sobre:{
    width: '50%',
    height: '38%'
  },
  sobreContainer:{
    marginLeft: '50%',
    width: '30%',
    marginLeft: '86%',
    marginBottom: '-103%'
  },
  containerBotaoMais:{
    //width: -800, //voltar aqui depois de alterar o tamanho do campo foto
    height: '11.5%',
    marginRight: '20%'
  },
  botaoMais:{
    width: 45,
    height: 45
  },
  containerFoto:{
    flex: 1,
    //marginBottom: '25%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '90%'
  },
  containerQRCode:{
    marginTop: '0%',
    alignItems: 'center',
    justifyContent: 'center',
    width:'90%',
    backgroundColor: '#FFFF',
    borderRadius: 20,
    height: '50%',
    marginBottom: '15%'
  },
  containerNome:{
    //
    width: '13%', 
    height: '30%'
  },
  QRCode:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textNome:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFF',
    width:'400%',
    height:'120%',
    marginTop: '100%'
  }
})