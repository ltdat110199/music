import { Injectable } from '@nestjs/common';
import { Prisma, Song } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SongService {
  constructor(private prisma: PrismaService) {}

  async createSong(data: Prisma.SongCreateInput): Promise<Song> {
    return this.prisma.song.create({ data });
  }

  async findAllSongs(): Promise<Song[]> {
    return this.prisma.song.findMany();
  }

  async findOneSong(id: number): Promise<Song> {
    return this.prisma.song.findUnique({ where: { id } });
  }

  async updateSong(id: number, data: Prisma.SongUpdateInput): Promise<Song> {
    return this.prisma.song.update({ where: { id }, data });
  }

  async deleteSong(id: number): Promise<Song> {
    return this.prisma.song.delete({ where: { id } });
  }
}
