import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import StyleTela from './StyleTela'; // Tela para pesquisar jogadores
import StyleTelaTime from './StyleTelaTime'; // Tela para pesquisar times

// Caminho para a imagem de fundo no seu projeto
const backgroundImage = require('./assets/Champions1.jpg');

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home'); // Estado para controlar a tela atual

  // Funções para alterar a tela atual
  const showPlayerSearch = () => setCurrentScreen('styleTela');
  const showTeamSearch = () => setCurrentScreen('styleTelaTime');
  const showHome = () => setCurrentScreen('home');
 
  return (
    <SafeAreaView style={styles.container}>
      {currentScreen === 'home' && (
        <ImageBackground source={backgroundImage} style={styles.background}>
          <View style={styles.homeContainer}>
            <Text style={styles.title}>Bem-vindo ao FootData</Text>
            <Text style={styles.subtitle}>Seu aplicativo para ficar por dentro da bola!</Text>
            <Text style={styles.subtitle}>Selecione uma opção para continuar</Text>

            <TouchableOpacity style={styles.button} onPress={showPlayerSearch}>
              <Text style={styles.buttonText}>Pesquisar Jogador</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={showTeamSearch}>
              <Text style={styles.buttonText}>Pesquisar Time</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )}

      {currentScreen === 'styleTela' && (
        <View style={styles.screenContainer}>
          <View style={styles.navbar}>
            <TouchableOpacity style={styles.navButton} onPress={showHome}>
              <Text style={styles.navButtonText}>⬅ Voltar</Text>
            </TouchableOpacity>
          </View>
          <StyleTela />
        </View>
      )}

      {currentScreen === 'styleTelaTime' && (
        <View style={styles.screenContainer}>
          <View style={styles.navbar}>
            <TouchableOpacity style={styles.navButton} onPress={showHome}>
              <Text style={styles.navButtonText}>⬅ Voltar</Text>
            </TouchableOpacity>
          </View>
          <StyleTelaTime />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    borderRadius: 10,
    padding: 20,
  },
  screenContainer: {
    flex: 1,
  },
  navbar: {
    height: 70,
    backgroundColor: '#09104d',
    justifyContent: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    
    
    
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  navButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,

  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    height: 70,
    width: 150,
    justifyContent: 'center',
  },
  backButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default App;
