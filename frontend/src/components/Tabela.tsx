import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.table`
  width: 80%;
  margin: auto;
  border-collapse: separate;
  border-spacing: 0 8px; /* Espaçamento vertical e horizontal entre células */
  margin-top: 20px;
  text-align: center;
`;

const Head = styled.thead`
  background-color: #f2f2f2; /* Cor de fundo do cabeçalho */
`;

const Column = styled.td`
  padding: 8px; /* Espaçamento interno das células */
  border-bottom: 1px solid #ccc; /* Linha de divisória cinza */
  border-right: 1px solid #ccc; /* Linha de divisória vertical cinza */
`;

const Table: React.FC<{ jogadores: any[] }> = ({ jogadores }) => {
    return (
        <TableContainer>
            <Head>
                <tr>
                    <Column>ID</Column>
                    <Column>Nome</Column>
                    <Column>Time</Column>
                    <Column>Data de Criação</Column>
                </tr>
            </Head>
            <tbody>
                {jogadores.map((jogador) => (
                    <tr key={jogador.id}>
                        <Column>{jogador.id}</Column>
                        <Column>{jogador.nome}</Column>
                        <Column>{jogador.time}</Column>
                        <Column>{jogador.dataCriacao}</Column>
                    </tr>
                ))}
            </tbody>
        </TableContainer>
    );
};

export default Table;
