import React from 'react';
import CreateJogadorForm from '../../components/CreateJogadorForm';
import Head from 'next/head';
import Header from '../../components/Header'
import styled from 'styled-components';


const Title = styled.h1`
    margin-left: 20px;
    margin-top: 30px;      
    font-weight: bold;      
`;

const Observacao = styled.h3`
text-align: center;
justify-content: center;
margin-top: 30px;
`

const NovoJogadorPage: React.FC = () => {
    return (
        <div>
            <Head>
                <title>Futlovers - Criar Novo Jogador </title>
                <link rel="icon" href="../../public/favicon.ico" />
            </Head>
            <Header />
            <Title>Criar Novo Jogador</Title>
            <CreateJogadorForm />
            <Observacao> Obs: Para criar um novo jogador é recomendado ter criado um time antes.</Observacao>
        </div>
    );
};

export default NovoJogadorPage;