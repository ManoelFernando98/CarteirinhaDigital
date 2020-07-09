import React, { Component } from 'react'
import { Image, Text, StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native'
import QRCode from 'react-native-qrcode-svg';


const QRCodeSize = Dimensions.get("window").width * 0.70;

export default class Home extends React.Component { 
  
  render(){
    
    //const InsertText = '119804' ;
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
            Manoel Fernando Thomaz Lopes Conceição da Silva {'\n'}
            R.A: 119804 {'\n'}
            Eng. Química {'\n'}
          </Text>
          </View>

        <View style={styles.containerQRCode}>
        <QRCode
          style={styles.QRCode}
          value={'119804'}
          size={QRCodeSize}
          backgroundColor="white"
          color="black"
        />
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
    width: 350
  },
  cadastro:{
    //flex: 1,
    width: 50,
    height: 50,
    marginBottom: 5,
    marginTop: 5,
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
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFF',
    width:260,
    height:150
  }
})