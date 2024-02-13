import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService'
import { Team } from '.prisma/client';

@Injectable()
export class TeamsService {
    constructor(private prisma: PrismaService) { }

    // Busca todos os times
    async findAll(): Promise<Team[]> {
        const teams = await this.prisma.team.findMany();

        // Lança um erro se nenhum time for encontrado
        if (teams.length === 0) {
            throw new Error('Nenhum time encontrado');
        }

        return teams;
    }

    // Cria um novo time
    async create(createTeamDto: { name: string }): Promise<Team> {
        return this.prisma.team.create({
            data: { name: createTeamDto.name, updated_at: null },
        });
    }

    // Atualiza um time pelo ID
    async update(id: number, updateTeamDto: { name: string }): Promise<Team> {
        return this.prisma.team.update({
            where: { id },
            data: {
                name: updateTeamDto.name,
                updated_at: new Date(), // Atualiza a data de última atualização
            },
        });
    }

    // Remove um time pelo ID
    async remove(id: number): Promise<string> {
        // Deleta o time pelo ID
        await this.prisma.team.delete({ where: { id } });
        return 'Time deletado com sucesso';
    }
}
