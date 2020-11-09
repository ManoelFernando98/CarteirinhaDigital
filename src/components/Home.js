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
      fetch('http://localhost:3030/usuarios/' + ra , {
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
    
    

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      }
      else {
        //console.warn(url);
        let codigo = this.ra;
        let source = { uri :  response.uri };
        const photoName = source.uri; 
        const urlA = url; 

        
        //console.warn(this.state.avatarSource);
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        
        this.setState({
          avatarSource: urlA,
          pic:response.data
        });

        
        fetch('http://localhost:3030/usuarios/' + ra , {
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
          <View style={styles.containerFoto}>
          <Image
            style={[styles.foto]}
            source ={{uri: url}}
          />
          </View>
          :
          <View style={styles.containerFoto}>
          <Image
            style={[styles.foto]}
            source ={require('../components/logoPersonagem.png')}
          />
          </View>
        }

          <View style={styles.containerNome}>
            <Text style={styles.textNome}>
              Nome: {nome} {'\n'}
              R.A: {ra} {'\n'}
              Curso: {curso} {'\n'}
            </Text>
          </View>

          <View style={styles.containerBotaoMais}>
            <TouchableOpacity onPress={() => {this.adicionarFoto()}}>
              <Image 
                style={[styles.botaoMais]}
                source = {require('../components/botaoMais.png')}
              />
            </TouchableOpacity>
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
    width: 160,
    height: 170,
    marginTop: 80,
    borderRadius: 30
  },
  containerCadastro:{
    width: 30,
    marginTop: -45,
    marginRight: 320
  },
  cadastro:{
    //flex: 1,
    width: 50,
    height: 50,
    marginTop: -10,
    marginBottom: 8
  },
  containerBotaoMais:{
    width: 120,
    height: 40
  },
  botaoMais:{
    width: 45,
    height: 45
  },
  sobre:{
    width: 50,
    height: 55
  },
  sobreContainer:{
    marginTop: 8,
    marginBottom: -7,
    marginRight: -320,
    marginBottom: 2
  },
  containerFoto:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 380
  },
  containerQRCode:{
    alignItems: 'center',
    justifyContent: 'center',
    width:'90%',
    backgroundColor: '#FFFF',
    borderRadius: 20,
    height: 410,
    marginBottom: 50
  },
  containerNome:{
    width: 24, 
    height: 165,
    marginBottom: -18,
  },
  QRCode:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textNome:{
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFF',
    width:'900%',
    height:'170%'
  }
})