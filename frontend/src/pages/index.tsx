import React from 'react';
import Header from '../components/Header';
import Tabela from '../components/Tabela';
import BotaoAdicionarJogador from '../components/ButtonAdicionaJogador';

const Home: React.FC = () => {
  const jogadores = [
    { id: 1, nome: 'Jogador1', time: 'Time A', dataCriacao: '2022-02-14' },
    // Adicione mais jogadores conforme necessário
  ];

  return (
    <div>
      <Header />
      <BotaoAdicionarJogador onClick={() => console.log('Adicionar Jogador')} />
      <Tabela jogadores={jogadores} />
    </div>
  );
};

export default Home;