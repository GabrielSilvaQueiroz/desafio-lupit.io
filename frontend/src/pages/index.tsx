// index.tsx
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Head from 'next/head';
import Tabela from '../components/Tabela';
import Buttons from '../components/Buttons';
import { fetchJogadores } from '../pages/api/players';
import { fetchTimes, Time } from '../pages/api/teams';

interface Jogador {
  id: number;
  nome: string;
  time: number;
  dataCriacao: string;
  timeNome?: string;
}

const Home: React.FC = () => {
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [timesMap, setTimesMap] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jogadoresData = await fetchJogadores();
        const timesData = await fetchTimes();

        // Mapeando os jogadores e substituindo time pelo nome do time
        const jogadoresMapeados = jogadoresData.map((jogador) => ({
          ...jogador,
          timeNome: timesData[jogador.time],
        }));

        setJogadores(jogadoresMapeados);
        setTimesMap(timesData);
      } catch (error) {
        console.error('Erro ao obter dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>Futlovers</title>
        <link rel="icon" href="../../public/favicon.ico" />
      </Head>
      <Header />
      <Buttons onClick={() => console.log('')} />
      <Tabela jogadores={jogadores} setJogadores={setJogadores} />    </div>
  );
};

export default Home;