import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, HttpStatus, Res } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from '.prisma/client';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) { }

  // Rota para buscar todos os jogadores
  @Get()
  async findAll(@Res() res): Promise<void> {
    try {
      const players = await this.playersService.findAll();

      // Verifica se há jogadores encontrados
      if (players.length === 0) {
        res.status(HttpStatus.NOT_FOUND).json({ message: 'Nenhum jogador encontrado' });
      } else {
        res.status(HttpStatus.OK).json(players);
      }
    } catch (error) {
      // Se ocorrer um erro ao buscar jogadores
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Erro ao buscar jogadores' });
    }
  }

  // Rota para criar um novo jogador
  @Post()
  async create(@Body() createPlayerDto: { name: string, age: number, teamId: number }, @Res() res): Promise<void> {
    try {
      const player = await this.playersService.create(createPlayerDto);
      // Retorna o jogador criado com o código 201 Created
      res.status(HttpStatus.CREATED).json(player);
    } catch (error) {
      // Se ocorrer um erro ao criar o jogador
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Erro ao criar o jogador' });
    }
  }

  // Rota para atualizar um jogador pelo ID
  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePlayerDto: { name: string, age: number, teamId?: number }, @Res() res): Promise<void> {
    try {
      const player = await this.playersService.update(+id, updatePlayerDto);
      // Retorna o jogador atualizado com o código 200 OK
      res.status(HttpStatus.OK).json(player);
    } catch (error) {
      // Se o ID for inválido
      if (error instanceof NotFoundException) {
        res.status(HttpStatus.NOT_FOUND).json({ message: 'ID inválido' });
      } else {
        // Se ocorrer um erro ao atualizar o jogador
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Erro ao atualizar o jogador' });
      }
    }
  }

  // Rota para deletar um jogador pelo ID
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res): Promise<void> {
    try {
      await this.playersService.remove(+id);
      // Retorna a mensagem de sucesso com o código 200 OK
      res.status(HttpStatus.OK).json({ message: 'Jogador deletado com sucesso' });
    } catch (error) {
      // Se o ID for inválido
      if (error instanceof NotFoundException) {
        res.status(HttpStatus.NOT_FOUND).json({ message: 'ID inválido' });
      } else {
        // Se ocorrer um erro ao deletar o jogador
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Erro ao deletar o jogador' });
      }
    }
  }
}