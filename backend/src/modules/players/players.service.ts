import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { Player } from '.prisma/client';

@Injectable()
export class PlayersService {
    constructor(private prisma: PrismaService) { }

    // Retorna todos os jogadores
    async findAll(): Promise<Player[]> {
        return this.prisma.player.findMany();
    }

    // Cria um novo jogador
    async create(createPlayerDto: { name: string, age: number, teamId: number }): Promise<Player> {
        // Certifica-se de verificar se o teamId existe antes de criar o jogador
        const teamExists = await this.prisma.team.findUnique({
            where: { id: createPlayerDto.teamId },
        });

        if (!teamExists) {
            throw new NotFoundException('Team não encontrado');
        }

        return this.prisma.player.create({
            data: {
                name: createPlayerDto.name,
                age: createPlayerDto.age,
                team_id: createPlayerDto.teamId,
                updated_at: null
            },
        });
    }

    // Atualiza um jogador pelo ID
    async update(id: number, updatePlayerDto: { name: string, age: number, teamId?: number }): Promise<Player> {
        const player = await this.prisma.player.findUnique({
            where: { id },
        });

        if (!player) {
            throw new NotFoundException('Player não encontrado');
        }

        return this.prisma.player.update({
            where: { id },
            data: {
                name: updatePlayerDto.name,
                age: updatePlayerDto.age,
                team_id: updatePlayerDto.teamId,
                updated_at: new Date(), // Atualiza a data de última atualização
            },
        });
    }

    // Remove um jogador pelo ID
    async remove(id: number): Promise<void> {
        const player = await this.prisma.player.findUnique({
            where: { id },
        });

        if (!player) {
            throw new NotFoundException('Player não encontrado');
        }

        await this.prisma.player.delete({
            where: { id },
        });
    }
}