import React, { Component, useState } from 'react'
import { Alert, Image, Text, StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import LoginCPF from './LoginCPF';
import ImagePicker from 'react-native-image-picker';
import TouchID from 'react-native-touch-id';

const QRCodeSize = Dimensions.get("window").width * 0.50;
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

  clicou = () => {
    Alert.alert("Sobre","Desenvolvedores:\n Daniel Alexandre Carneiro\n Manoel Fernando T. Lopes Conceição \n Thomas Tavares Dias ");
  }

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
    const id = params ? params.id : null;
    const nome = params ? params.nome : null;
    const perfil = params ? params.perfil : null;
    const ra = params ? params.ra : null;
    const curso = params ? params.curso : null;
    const url = params ? params.url : null;
    const btKit = params ? params.btKit : null;

    const btCadastro = perfil ? (perfil == 1 || perfil == 2) : false;

    //console.warn(btCadastro);
	  return (
      <View style={styles.background}>  
        <View style={styles.containerTrocaSenha}>
      
          <TouchableOpacity onPress={() => {
              this.props.navigation.navigate(
                'Senha', {
                  id: id, 
                }
            )}}>
          <Image
            style={[styles.trocaSenha]}
            source ={require('../components/trocaSenha.png')}
          />
          </TouchableOpacity>
        
        </View>
       
        
        { url
          ?
          
          <View  style={styles.containerFoto}>
          <Image
            style={[styles.foto]}
            source ={{uri: url}}
          />
          </View>
          
          :
          
          <View  style={styles.containerFoto}>
          <Image
            style={[styles.foto]}
            source ={require('../components/logoPersonagem.png')}
          />
          </View>
         
        }

          <View style={styles.containerNome}>
            <Text style={styles.textNome}>
              {nome} {'\n'}
              {ra} {'\n'}
              {curso} {'\n'}
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
           btCadastro
           ?
           <View style={[styles.containerCadastro]}>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate(
                'Cadastro', {
                  perfil: perfil, 
                }
            )}}>
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
  cadastro:{
    //flex: 1,
    width: '29%',
    height: '65%'
  },
  containerCadastro:{
    flex: 1,
    width: '37%',
    marginRight: '30%',
    marginBottom: '-1%'
  },
  sobre:{
    width: '34%',
    height: '70%'
  },
  sobreContainer:{
    flex: 1,
    marginLeft: '81%',
    width: '35%',
    marginBottom: '-25%'
  },
  containerBotaoMais:{
    //width: -800, //voltar aqui depois de alterar o tamanho do campo foto
    height: '10%',
    marginRight: '32%',
    marginTop: '-32%'
  },
  botaoMais:{
    width: 45,
    height: 45
  },
  containerTrocaSenha:{
    height: '1%',
    marginLeft: '58%',
    marginTop: '10%'
  },
  trocaSenha:{
    width: 45,
    height: 45
  },
  foto:{
    width: '32%',
    height: '115%',
    marginTop: '22%',
    borderRadius: 20
  },
  containerFoto:{
    flex: 1,
    width: '90%',
    marginLeft: '2%',
  },
    QRCode:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerQRCode:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFF',
    borderRadius: 20,
    width:'70%',
    height: '40%',
    marginBottom: '15%',
  },
  containerNome:{
    flexWrap: 'wrap',
    width: '14%', 
    height: '26%',
    marginRight: '10%',
  },
  textNome:{
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFF',
    width:'400%',
    height:'120%',
    marginTop: '-20%'
  }
})