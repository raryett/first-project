import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, ImageBackground, StyleSheet, TextInput, FlatList } from 'react-native';
import axios from 'axios';

// Caminho para a imagem de fundo no seu projeto
const backgroundImage = require('./assets/jogador.jpg');

const TelaSimples = () => {
  const [info, setInfo] = useState('Clique no botão para pesquisar');
  const [teamName, setTeamName] = useState(''); // Para entrada do nome do time
  const [leagueData, setLeagueData] = useState([]); // Para armazenar todos os dados da liga
  const [teamDetails, setTeamDetails] = useState(null); // Para armazenar detalhes do time pesquisado

  const fetchLeagueData = async () => {
    try {
      const response = await axios.get(
        'https://apiv3.apifootball.com/?action=get_teams&league_id=99&APIkey='
      );

      if (response.data && response.data.length > 0) {
        setLeagueData(response.data); // Armazena todos os dados da liga
        setInfo('Dados da liga carregados com sucesso');
      } else {
        setInfo('Nenhum dado encontrado');
      }
    } catch (error) {
      console.error(error);
      setInfo('Erro ao buscar dados da liga');
    }
  };

  const searchTeam = () => {
    // Pesquisa por um time específico no leagueData
    const team = leagueData.find(t => t.team_name.toLowerCase() === teamName.toLowerCase());

    if (team) {
      setTeamDetails({
        teamName: team.team_name,
        teamLogo: team.team_badge,
        teamCountry: team.team_country,
        players: team.players, // Armazena a lista de jogadores
      });

      setInfo(`Detalhes do time: ${teamName}`);
    } else {
      setTeamDetails(null);
      setInfo(`Time ${teamName} não encontrado`);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do time"
          value={teamName}
          onChangeText={setTeamName}
        />
        
        <View style={styles.buttonContainer}>
          <Button title="Carregar Dados da Liga" onPress={fetchLeagueData} />
          <Button title="Pesquisar Time" onPress={searchTeam} />
          <Button title="Limpar" onPress={() => {
            setTeamName('');
            setTeamDetails(null);
            setInfo('Clique para pesquisar um time');
          }} />
        </View>

        {teamDetails ? (
          <View style={styles.teamDetails}>
            <Image source={{ uri: teamDetails.teamLogo }} style={styles.teamLogo} />
            <Text>Nome: {teamDetails.teamName}</Text>
            <Text>País: {teamDetails.teamCountry}</Text>

            <Text style={styles.title}>Jogadores</Text>

            <FlatList
              data={teamDetails.players} // Lista de jogadores
              keyExtractor={(item) => item.player_key.toString()}
              renderItem={({ item }) => (
                <View style={styles.playerItem}>
                  <Image source={{ uri: item.player_image }} style={styles.playerImage} />
                  <Text>{item.player_name}</Text>
                  <Text>    {item.player_number}</Text>
                </View>
              )}
            />
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 60,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Para separar os botões
    marginBottom: 10,
  },
  teamDetails: {
    alignItems: 'center', // Centraliza os detalhes do time
  },
  teamLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
  playerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  playerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 10,
  },
});

export default TelaSimples;
