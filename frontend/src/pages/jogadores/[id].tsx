import React from 'react';
import Head from 'next/head';
import EditarJogadorForm from '../../components/EditarJogadorForm';
import Header from '../../components/Header';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Title = styled.h1`
    margin-left: 20px;
    margin-top: 30px;      
    font-weight: bold;      
`;

const JogadorEditPage: React.FC = () => {
    const router = useRouter();
    const { id, nome, idade } = router.query;

    // Verifica se o ID é válido
    if (!id || Array.isArray(id)) {
        return <div>Id inválido</div>;
    }

    // Converte o ID para um número inteiro
    const playerId = typeof id === 'string' ? parseInt(id, 10) : id;

    return (
        <div>
            <Head>
                <title>Futlovers - Editar Jogador </title>
                <link rel="icon" href="../../public/favicon.ico" />
            </Head>
            <Header />
            <Title>Editar Jogador</Title>
            <EditarJogadorForm playerId={playerId} />
        </div>
    );
};

export default JogadorEditPage;
