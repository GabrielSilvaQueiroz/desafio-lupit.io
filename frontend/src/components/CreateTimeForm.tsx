import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchTeams, Time } from '../pages/api/teams';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useRouter } from 'next/router';

interface DadosTime {
    name: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f0f0f0;
  padding: 20px;
  width: 60%;
  margin: 0 auto 50px;
  align-items: center;
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
  padding-left: 8px;
  color: #747474;
  font-family: Inter;
  font-size: 12px;
  font-weight: 500;

  &:hover {
    opacity: 0.8;
    border-color: #1764c1;
  }

  &:focus-visible,
  &:active {
    border-color: #1764c1;
  }
`;

const Button = styled.button`
  width: 150px;
  height: 42px;
  border-radius: 8px;
  background: #1764c1;
  color: #fff;
  font-family: Inter;
  font-size: 14px;
  font-weight: 700;
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

const CreateTimeForm: React.FC = () => {
    const [team, setTeam] = useState<DadosTime>({ name: '' });
    const [times, setTimes] = useState<Time[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const timesData = await fetchTeams();
                setTimes(timesData);
            } catch (error) {
                console.error('Erro ao buscar dados do time:', error);
            }
        };

        fetchData();
    }, []);

    const handleSave = async () => {
        try {
            if (!team.name) {
                throw new Error('Por favor, preencha o nome do time.');
            }

            await axios.post('http://localhost:3001/teams/', team);

            Swal.fire({
                title: 'Sucesso',
                text: 'Novo time cadastrado com sucesso',
                icon: 'success',
            }).then(() => {
                router.push('/');
            });
        } catch (error) {
            console.error('Erro ao criar novo time:', error);

            if (error instanceof Error && error.message) {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Não foi possível cadastrar o time, tente novamente mais tarde.',
                    icon: 'error',
                });
            } else {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Não foi possível cadastrar o novo time, tente novamente mais tarde.',
                    icon: 'error',
                });
            }
        }
    };

    return (
        <Container>
            <Form>
                <Label htmlFor="name">Nome do Time:</Label>
                <Input
                    type="text"
                    id="name"
                    value={team.name}
                    onChange={(e) => setTeam({ ...team, name: e.target.value })}
                />
            </Form>
            <Button type="button" onClick={handleSave}>
                Criar Novo Time
            </Button>
        </Container>
    );
};

export default CreateTimeForm;
