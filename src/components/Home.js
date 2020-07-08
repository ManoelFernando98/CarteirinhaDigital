import React, {useState} from 'react'
import { Image, Text, StyleSheet, View, useWindowDimensions, TouchableOpacity} from 'react-native'
import QRCode from 'react-native-qrcode-svg';

export default function Home(){ 
  const QRCodeSize = useWindowDimensions().width * 0.60;
  const InsertText = '119804' ;
  //let LogoSanta = require('./src/components/LogoUnisanta.jpg');
	
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
            Isabella Gasperini Rivelli{'\n'}
            R.A: 119804 {'\n'}
            Eng. Química {'\n'}
          </Text>
          </View>

        <View style={styles.containerQRCode}>
        <QRCode
          style={styles.QRCode}
          value={InsertText}
          size={QRCodeSize}
          backgroundColor="white"
          color="black"
        />
        </View> 

        <View style={[styles.containerCadastro]}>
        <TouchableOpacity onPress={() => {}}>
          <Image
          style={[styles.cadastro]}
          source ={require('../components/Cadastro.png')}
          />
        </TouchableOpacity>
        </View>

      </View>
  );
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
    marginTop: 20,
    borderRadius: 30
  },
  containerCadastro:{

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
    width: 380, 
    height: 380
  },
  containerQRCode:{
    alignItems: 'center',
    justifyContent: 'center',
    width:'90%',
    backgroundColor: '#FFFF',
    borderRadius: 20,
    height: 340
  },
  containerNome:{
    width: 20, 
    height: 175,
    marginBottom: 5,
  },
  QRCode:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100
  },
  textNome:{
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFF',
    width:260,
    height:150
  }
})