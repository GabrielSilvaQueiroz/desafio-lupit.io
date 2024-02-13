import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from '.prisma/client';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) { }

  // Rota para buscar todos os times
  @Get()
  async findAll(): Promise<Team[] | { message: string }> {
    try {
      const teams = await this.teamsService.findAll();
      return teams;
    } catch (error) {
      return { message: 'Nenhum time encontrado' };
    }
  }

  // Rota para criar um novo time
  @Post()
  async create(@Body() createTeamDto: { name: string }): Promise<Team | { message: string }> {
    try {
      const team = await this.teamsService.create(createTeamDto);
      return team;
    } catch (error) {
      return { message: 'Erro ao criar o time' };
    }
  }

  // Rota para atualizar um time pelo ID
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTeamDto: { name: string }): Promise<Team | { message: string }> {
    try {
      const team = await this.teamsService.update(+id, updateTeamDto);
      return team;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { message: 'ID inválido' };
      }
      return { message: 'Erro ao atualizar o time' };
    }
  }

  // Rota para deletar um time pelo ID
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    try {
      const message = await this.teamsService.remove(+id);
      return { message };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { message: 'ID inválido' };
      }
      return { message: 'Erro ao deletar o time' };
    }
  }
}