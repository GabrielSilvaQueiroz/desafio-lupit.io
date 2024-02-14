import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, HttpStatus, Res } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from '.prisma/client';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) { }

  // Rota para buscar todos os times
  @Get()
  async findAll(@Res() res): Promise<void> {
    try {
      const teams = await this.teamsService.findAll();
      res.status(HttpStatus.OK).json(teams);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Nenhum time encontrado' });
    }
  }

  // Rota para criar um novo time
  @Post()
  async create(@Body() createTeamDto: { name: string }, @Res() res): Promise<void> {
    try {
      const team = await this.teamsService.create(createTeamDto);
      res.status(HttpStatus.CREATED).json({ team });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Erro ao criar o time' });
    }
  }

  // Rota para atualizar um time pelo ID
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTeamDto: { name: string }, @Res() res): Promise<void> {
    try {
      const team = await this.teamsService.update(+id, updateTeamDto);
      res.status(HttpStatus.OK).json(team);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(HttpStatus.NOT_FOUND).json({ message: 'ID inválido' });
      } else {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Erro ao atualizar o time' });
      }
    }
  }

  // Rota para deletar um time pelo ID
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res): Promise<void> {
    try {
      const message = await this.teamsService.remove(+id);
      res.status(HttpStatus.OK).json({ message });
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(HttpStatus.NOT_FOUND).json({ message: 'ID inválido' });
      } else {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Erro ao deletar o time' });
      }
    }
  }
}