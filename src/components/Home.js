import React, { Component } from 'react'
import { Alert, Image, Text, StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import LoginCPF from './LoginCPF';
import ImagePicker from 'react-native-image-picker';

const QRCodeSize = Dimensions.get("window").width * 0.70;
const options = {
  title: 'Escolha sua foto'
}

export default class Home extends React.Component { 

  constructor(props){
    super(props);
    this.state={
      avatarSource: null,
      pic: null
    }
  }

  clicou = () => {
    Alert.alert("Sobre","Desenvolvedores:\n Daniel Alexandre Carneiro\n Manoel Fernando T. Lopes Conceição \n Thomas Tavares Dias ");
  }
  
  adicionarFoto = () => {
    const { params } = this.props.navigation.state
    const ra = params ? params.ra : null;
    
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
        const fileURL = source.uri.split("/");
        const photoName = source.uri; 

        //console.warn(this.state.avatarSource);
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        
        this.setState({
          avatarSource: source.uri,
          pic:response.data
        });


        console.warn(photoName);
        
        
         fetch('http://localhost:3030/usuarios/codigo/' + ra , {
          method: 'POST',
          
          body: JSON.stringify({
              foto: photoName
            })
          })

        Alert.alert("Atenção!","O cadastro da foto foi efetuado com sucesso.");

       
      }
    });
  }

  render(){
    const { params } = this.props.navigation.state;
    const nome = params ? params.nome : null;
    const btAdm = params ? params.btAdm : null;
    const ra = params ? params.ra : null;
    const curso = params ? params.curso : null;

	  return (
        <View style={styles.background}>  
        
        { this.state.avatarSource
          ?
          <View style={styles.containerFoto}>
          <Image
            style={[styles.foto]}
            source ={this.state.avatarSource}
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
            value={ra.toString()}
            size={QRCodeSize}
            backgroundColor="white"
            color="black"
          />
          </View>

          <View style={[styles.sobreContainer]}>
            <TouchableOpacity onPress={() => {this.clicou()}}>
              <Image
              style={[styles.sobre]}
              source ={require('../components/sobre.png')}
              />
            </TouchableOpacity>
          </View>

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
            false
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
    backgroundColor: '#38C7E1'
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
    height: 50
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