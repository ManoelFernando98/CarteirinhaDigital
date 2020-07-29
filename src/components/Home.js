import React, { Component } from 'react'
import { Alert, Image, Text, StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import LoginCPF from './LoginCPF';

const QRCodeSize = Dimensions.get("window").width * 0.70;

export default class Home extends React.Component { 

  clicou = () => {
    Alert.alert("Sobre","Desenvolvedores:\n Daniel Alexandre Carneiro\n Manoel Fernando T. Lopes Conceição \n Thomas Tavares Dias ");
  }
  
  render(){
    const { params } = this.props.navigation.state;
    const nome = params ? params.nome : null;
    const ra = params ? params.ra : null;
    const curso = params ? params.curso : null;
	  return (
      
      <View style={styles.background}>  
          <View style={styles.containerFoto}>
          <Image
            style={[styles.foto]}
            source ={require('../components/logoPersonagem.jpeg')}
          />
          </View>

          <View style={styles.containerNome}>
          <Text style={styles.textNome}>
            Nome: {nome} {'\n'}
            R.A: {ra} {'\n'}
            Curso: {curso} {'\n'}
          </Text>
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

        <View style={[styles.containerCadastro]}>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Cadastro')}}>
            <Image
            style={[styles.cadastro]}
            source ={require('../components/Cadastro.png')}
            />
          </TouchableOpacity>
        </View> 

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
    marginTop: 10,
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
    marginBottom: 5,
  },
  sobre:{
    width: 50,
    height: 50
  },
  sobreContainer:{
    marginTop: 3,
    marginBottom: -7,
    marginRight: -320
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
    height: 350
  },
  containerNome:{
    width: 24, 
    height: 175,
    marginBottom: 10,
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
    height:'150%'
  }
})