import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from '.prisma/client';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) { }

  // Rota para buscar todos os jogadores
  @Get()
  async findAll(): Promise<Player[] | { message: string }> {
    try {
      const players = await this.playersService.findAll();

      if (players.length === 0) {
        return { message: 'Nenhum jogador encontrado' }; // Retorna uma mensagem em JSON se nenhum jogador for encontrado
      }

      return players; // Retorna a lista de jogadores se houver algum
    } catch (error) {
      return { message: 'Erro ao buscar jogadores' }; // Retorna uma mensagem de erro em JSON
    }
  }

  // Rota para criar um novo jogador
  @Post()
  async create(@Body() createPlayerDto: { name: string, age: number, teamId: number }): Promise<Player | { message: string }> {
    try {
      const player = await this.playersService.create(createPlayerDto);
      return player; // Retorna o jogador criado
    } catch (error) {
      return { message: 'Erro ao criar o jogador' }; // Retorna uma mensagem de erro em JSON
    }
  }

  // Rota para atualizar um jogador pelo ID
  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePlayerDto: { name: string, age: number, teamId?: number }): Promise<Player | { message: string }> {
    try {
      const player = await this.playersService.update(+id, updatePlayerDto);
      return player; // Retorna o jogador atualizado
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { message: 'ID inválido' }; // Retorna uma mensagem de erro em JSON
      }
      return { message: 'Erro ao atualizar o jogador' }; // Retorna uma mensagem de erro em JSON
    }
  }

  // Rota para deletar um jogador pelo ID
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.playersService.remove(+id);
      return { message: 'Jogador deletado com sucesso' }; // Retorna uma mensagem de sucesso em JSON
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { message: 'ID inválido' }; // Retorna uma mensagem de erro em JSON
      }
      return { message: 'Erro ao deletar o jogador' }; // Retorna uma mensagem de erro em JSON
    }
  }
}