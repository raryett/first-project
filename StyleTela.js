import React, { useState } from 'react';
import { View, Text, Button, Image, ImageBackground, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';

// Caminho para a imagem de fundo no seu projeto
const backgroundImage = require('./assets/festa.jpg'); 

const TelaSimples = () => {
  const [info, setInfo] = useState('Clique no botão para pesquisar');
  const [playerName, setPlayerName] = useState('');
  const [playerDetails, setPlayerDetails] = useState(null); // Para armazenar os detalhes do jogador

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://apiv3.apifootball.com/?action=get_players&player_name=${playerName}&APIkey=putTheKey`
      );

      if (response.data && response.data.length > 0) {
        const player = response.data[0]; // Primeiro resultado
        setPlayerDetails({
          teamName: player.team_name,
          playerImage: player.player_image,
          playerAge: player.player_age,
          playerType: player.player_type,
          playerPosition: player.player_type
        });

        setInfo(`Jogador pesquisado: ${playerName}`);
      } else {
        setPlayerDetails(null);
        setInfo('Jogador não encontrado');
      }
    } catch (error) {
      console.error(error);
      setPlayerDetails(null);
      setInfo('Erro ao buscar jogador');
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do jogador"
          value={playerName}
          onChangeText={setPlayerName}
        />
        <Button title="Pesquisar" onPress={handleSearch} />

        {playerDetails ? (
          <View style={styles.playerDetails}>
            <Image source={{ uri: playerDetails.playerImage }} style={styles.playerImage} />
            <Text>Time: {playerDetails.teamName}</Text>
            <Text>Idade: {playerDetails.playerAge}</Text>
            <Text>Posição: {playerDetails.playerPosition}</Text>

          </View>
        ) : (
          <Text style={styles.label}>{info}</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 40,
    borderRadius: 30,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  playerDetails: {
    alignItems: 'center', // Centraliza os detalhes do jogador
  },
  playerImage: {
    width: 100, // Largura da imagem do jogador
    height: 100, // Altura da imagem do jogador
    borderRadius: 50, // Deixa a imagem redonda
    marginVertical: 10, // Espaço entre elementos verticais
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
  },
});

export default TelaSimples;
