import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import ImageTrash from '../../public/assets/trash.svg'
import ImageEdit from '../../public/assets/edit.png'
import Swal from 'sweetalert2';
import axios from 'axios';
import { useRouter } from 'next/router';




// Estilos para a tabela
const TableContainer = styled.table`
  width: 80%;
  margin: auto;
  border-collapse: separate;
  border-spacing: 0 8px;
  margin-top: 20px;
  text-align: center;
`;

const Head = styled.thead`
  background-color: #f2f2f2;
`;

const Column = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
`;

const ActionsButton = styled.button`
  cursor: pointer;
  margin-right: 5px;
  background: none;
  border: none;


    &:hover {
        opacity: 0.8;
    }

    &:active {
        opacity: 0.6;
    }

`;

// Componente da tabela
const Table: React.FC<{ jogadores: any[]; setJogadores: React.Dispatch<React.SetStateAction<any[]>> }> = ({
    jogadores,
    setJogadores,
}) => {

    const router = useRouter();

    const handleEdit = (id: number) => {
        // Redirecione para a página de edição do jogador
        router.push(`/jogadores/${id}`);
    };

    const handleRemove = async (id: number) => {
        const removeJogador = async () => {
            try {
                // Lógica para remover jogador no backend
                await axios.delete(`http://localhost:3001/players/${id}`);

                // Atualize o estado jogadores removendo o jogador com o ID correspondente
                setJogadores((prevJogadores) => prevJogadores.filter((jogador) => jogador.id !== id));

                // Exiba uma mensagem de sucesso
                Swal.fire('Removido!', 'O jogador foi removido com sucesso.', 'success');
            } catch (error) {
                console.error('Erro ao remover jogador:', error);

                // Exiba uma mensagem de erro
                Swal.fire('Erro', 'Ocorreu um erro ao remover o jogador.', 'error');
            }
        };

        Swal.fire({
            title: 'Tem certeza?',
            text: 'Remover o jogador é uma ação irreversível',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
        }).then((result) => {
            if (result.isConfirmed) {
                // Se o usuário clicou em "Sim", remova o jogador
                removeJogador();
            }
        });
    };


    return (
        <TableContainer>
            <Head>
                {/* Cabeçalho da tabela */}
                <tr>
                    <Column>ID</Column>
                    <Column>Nome</Column>
                    <Column>Time</Column>
                    <Column>Data de Criação</Column>
                    <Column>Ações</Column>
                </tr>
            </Head>
            <tbody>
                {/* Mapeando e exibindo cada jogador na tabela */}
                {jogadores.map((jogador) => (
                    <tr key={jogador.id}>
                        <Column>{jogador.id}</Column>
                        <Column>{jogador.nome}</Column>
                        {/* Exibindo o nome do time em vez do número */}
                        <Column>{jogador.timeNome}</Column>
                        <Column>{jogador.dataCriacao}</Column>
                        <Column>
                            <ActionsButton onClick={() => handleEdit(jogador.id)}>
                                <Image src={ImageEdit} alt='Imagem de Edição' width="30" height="20" />
                            </ActionsButton>

                            <ActionsButton onClick={() => handleRemove(jogador.id)}>
                                <Image src={ImageTrash} alt='Imagem de Lixeira' width="30" height="20" />
                            </ActionsButton>


                        </Column>
                    </tr>
                ))}
            </tbody>
        </TableContainer>
    );
};

export default Table;