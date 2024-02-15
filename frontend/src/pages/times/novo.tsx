import React from 'react';
import CreateTimeForm from '../../components/CreateTimeForm';
import Head from 'next/head';
import Header from '../../components/Header'
import styled from 'styled-components';


const Title = styled.h1`
    margin-left: 20px;
    margin-top: 30px;      
    font-weight: bold;      
`;

const NovoTimePage: React.FC = () => {
    return (
        <div>
            <Head>
                <title>Futlovers - Criar Novo Time </title>
            </Head>
            <Header />
            <Title>Criar Novo Time</Title>
            <CreateTimeForm />
        </div>
    );
};

export default NovoTimePage;