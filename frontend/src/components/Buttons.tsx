import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const BotaoContainer = styled.button`
  background-color: #2196f3;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 18px;
  cursor: pointer;
  font-size: 12px;
  font-style: normal;
  font-weight: 800;
  width: 200px;
  height: 42px;
  margin-right: 20px;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;

const DivItems = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;  // Alterado para space-between
  align-items: center;  // Adicionado para centralizar verticalmente
  margin-top: 30px;
  gap: 20px;
  margin-bottom: 150px;
`;

const TitleJogadores = styled.h1`
  font-weight: bold;
  margin-left: 20px;
`;

const BotaoAdicionarJogador: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const router = useRouter();

  return (
    <>
      <DivItems>
        <TitleJogadores> Jogadores </TitleJogadores>
        <div>
          <BotaoContainer onClick={() => {
            // Redireciona para a página jogadores/novo
            router.push('/jogadores/novo');
          }}>
            + Adicionar Jogador
          </BotaoContainer>
          <BotaoContainer onClick={() => {
            // Redireciona para a página times/novo
            router.push('/times/novo');
          }}>
            + Adicionar Time
          </BotaoContainer>
        </div>
      </DivItems>
    </>
  );
};

export default BotaoAdicionarJogador;
