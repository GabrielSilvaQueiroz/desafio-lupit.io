import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchTeams, Time } from '../pages/api/teams';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useRouter } from 'next/router';

interface Jogador {
    name: string;
    age: number;
    teamId: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f0f0f0; /* Cor de fundo cinza */
  padding: 20px;
  width: 60%;
  margin: 0px auto;
  align-items: center;
  margin-top: 50px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`;

const Label = styled.label``;

const Input = styled.input`
  width: 265px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #d5d5d5;
  cursor: pointer;
  padding-left: 8px;
  color: #747474;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:hover {
    opacity: 0.8;
    border-color: #1764c1;
  }

  &:focus-visible {
    border-color: #1764c1;
    border-radius: 1px solid #1764c1;
  }

  &:active {
    border-color: #1764c1;
    border-radius: 1px solid #1764c1;
  }
`;

const Select = styled.select`
  width: 265px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #d5d5d5;
  cursor: pointer;
  padding-left: 3px;
  color: #1764c1;
  font-family: Inter;
  font-style: normal;
  line-height: normal;
`;

const Button = styled.button`
  width: 150px;
  height: 42px;
  border-radius: 8px;
  background: #1764c1;
  color: #fff;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border: none;
  cursor: pointer;
  align-self: flex-end;
  margin-top: 30px;
  margin-right: 30px;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;

const CreateJogadorForm: React.FC = () => {
    const [jogador, setJogador] = useState<Jogador>({ name: '', age: 0, teamId: 0 });
    const [times, setTimes] = useState<Time[]>([]);
    const [jogadorCarregado, setJogadorCarregado] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const timesData = await fetchTeams();
                setTimes(timesData);
                setJogadorCarregado(true);
            } catch (error) {
                console.error('Erro ao buscar dados do jogador:', error);
            }
        };

        fetchData();
    }, []);

    const router = useRouter();

    const handleSalvar = async () => {
        try {
            // Validando campos obrigatórios
            if (!jogador.name || !jogador.age || !jogador.teamId) {
                throw new Error('Por favor, preencha todos os campos.');
            }

            console.log('Criando novo jogador:', jogador);
            await axios.post('http://localhost:3001/players/', jogador);

            // Exibe o Sweet Alert de sucesso
            Swal.fire({
                title: 'Sucesso',
                text: 'Novo jogador cadastrado com sucesso',
                icon: 'success',
            }).then(() => {
                // Redireciona para a página principal
                router.push('/');
            });
        } catch (error) {
            console.error('Erro ao criar novo jogador:', error);

            // Adicionando verificação de tipo para 'error'
            if (error instanceof Error && error.message) {
                // Exibe o Sweet Alert de erro com a mensagem detalhada
                Swal.fire({
                    title: 'Erro!',
                    text: 'Não conseguimos cadastrar o jogador, tente novamente mais tarde.',
                    icon: 'error',
                });
            } else {
                // Exibe um alerta genérico se não for possível obter a mensagem de erro
                Swal.fire({
                    title: 'Erro!',
                    text: 'Não conseguimos cadastrar o novo jogador, tente novamente mais tarde.',
                    icon: 'error',
                });
            }
        }
    };

    return (
        <Container>
            <Form>
                <Label htmlFor="nome">Nome:</Label>
                <Input
                    type="text"
                    id="nome"
                    value={jogador.name || ''}
                    onChange={(e) => setJogador({ ...jogador, name: e.target.value })}
                />

                <Label htmlFor="idade">Idade:</Label>
                <Input
                    type="text"
                    id="idade"
                    value={jogador.age || ''}
                    onChange={(e) => setJogador({ ...jogador, age: parseInt(e.target.value, 10) })}
                />

                <Label htmlFor="time">Time:</Label>
                <Select
                    id="time"
                    value={jogador.teamId || ''}
                    onChange={(e) => setJogador({ ...jogador, teamId: parseInt(e.target.value, 10) })}
                >
                    <option value="">Selecione o Time</option>
                    {times.map((time) => (
                        <option key={time.id} value={time.id}>
                            {time.name}
                        </option>
                    ))}
                </Select>
            </Form>
            <Button type="button" onClick={handleSalvar}>
                Criar Novo Jogador
            </Button>
        </Container>
    );
};

export default CreateJogadorForm;