import React, {Component} from 'react';
import { Alert, KeyboardAvoidingView ,Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

export default class App extends Component{

  clicou = () => {
    Alert.alert("Atenção","Digite seu RA");
  }

  static navigationOptions = {
    header: null,
  };

  state = { CPF: '', Senha: ''};

  handleCPFChange = (CPF) => {
    this.setState({ CPF });
  };
  
  handleSenhaChange = (Senha) => {
    this.setState({ Senha });
  };

  handleSignInPress = async () => {
    if (this.state.CPF.length == 0 || this.state.Senha.length == 0) {
      Alert.alert("Atenção","Preencha CPF e senha para continuar!");
    } else {
        const response = await api.get('/usuarios/', {
          CPF: this.state.CPF,
          Senha: this.state.Senha,
        });
        
        if(handleCPFChange == CPF && handleSenhaChange == Senha)
          this.props.navigation.navigate('Home');
        else
          Alert.alert("Atenção","Houve um problema com o login, verifique suas credenciais!");

    }
  };

  render(){
    return(
      <KeyboardAvoidingView style={styles.background}>
        <View style={styles.containerLogo}>
          <Image
            style={[ styles.logo]}
            source ={require('../components/LogoCarteirinha.png')}
          />
        <Text style={styles.texto}> Carteirinha Digital </Text> 
        </View>
  
        <View style={[ styles.container]}>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          autoCorrect={false}
          placeholder="CPF"
          value={this.state.CPF}
          onChangeText={this.handleCPFChange}
        />
  
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Senha"
          keyboardType="numeric"
          autoCorrect={false}
          onChangeText = {this.handleSenhaChange}
          value={this.state.Senha}
        />
  
        <TouchableOpacity
          style={styles.botao}
          onPress={() => { this.handleSignInPress}}
        >
          <Text style={styles.botaoText}>Login</Text>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={() => {this.props.navigation.navigate('LoginRA'), this.clicou()}}>
          <Text style={styles.textRA}>Entrar com RA</Text>
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
    width: 250,
    height: 190,
    marginTop: 80,
    borderRadius: 10
  },
  input:{
    borderColor: 'navy',
    width: '90%',
    marginBottom: 15,
    fontSize: 17,
    borderRadius: 10,
    padding: 10,
    marginTop: -10,
    height: 42,
    backgroundColor: '#fff',
    borderWidth: 1,
    fontWeight: 'bold',
  },
  botao: {
    width:'90%',
    height: 42,
    backgroundColor: '#3D9CF5',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -10
  },
  botaoText:{
    fontSize: 25,
    fontWeight: 'bold',
    color:'#fff'
  },
  textRA:{
    fontSize: 25,
    fontWeight: 'bold',
    color: '#3D9CF5',
    marginTop: 5
  }
});