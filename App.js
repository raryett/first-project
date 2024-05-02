import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import StyleTela from './StyleTela'; // Tela para pesquisar jogadores
import StyleTelaTime from './StyleTelaTime'; // Tela para pesquisar times

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home'); // Estado para controlar a tela atual

  // Funções para alterar a tela atual
  const showPlayerSearch = () => setCurrentScreen('styleTela');
  const showTeamSearch = () => setCurrentScreen('styleTelaTime');
  const showHome = () => setCurrentScreen('home');

  return (
    <SafeAreaView style={styles.container}>
      {currentScreen === 'home' && (
        <View style={styles.homeContainer}>
          <Text style={styles.title}>Bem-vindo ao App de Futebol</Text>
          <Text style={styles.subtitle}>Selecione uma opção para continuar</Text>

          <TouchableOpacity style={styles.button} onPress={showPlayerSearch}>
            <Text style={styles.buttonText}>Pesquisar Jogador</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={showTeamSearch}>
            <Text style={styles.buttonText}>Pesquisar Time</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentScreen === 'styleTela' && (
        <View style={styles.screenContainer}>
          <StyleTela />
          <TouchableOpacity style={styles.backButton} onPress={showHome}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentScreen === 'styleTelaTime' && (
        <View style={styles.screenContainer}>
          <StyleTelaTime />
          <TouchableOpacity style={styles.backButton} onPress={showHome}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Cor de fundo
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },
  screenContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#e74c3c', // Cor para o botão de voltar
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute', // Define o posicionamento absoluto
    bottom: 20, // Define a posição na parte inferior
    left: 20, // Distância da borda esquerda
    right: 20, // Distância da borda direita
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
