import { Injectable } from '@nestjs/common';
import { Prisma, Album } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async createAlbum(createAlbumDto: CreateAlbumDto) {
    const { thumnail_url, album_name, description, songs } = createAlbumDto;

    const formattedSongs = songs.map((song) => ({
      artist: song.artist,
      duration: song.duration,
      path: song.path,
      song_name: song.song_name,
      thumnail_url: song.thumnail_url,
    }));
    return this.prisma.album.create({
      data: {
        thumnail_url,
        album_name,
        description,
        songs: {
          create: formattedSongs,
        },
      },
      include: {
        songs: true,
      },
    });
  }

  async findAllAlbums(page: number = 1, limit: number = 10): Promise<{ data: Album[], total: number, limit:number }> {
    const skip = (page - 1) * limit;
    const take = limit;

    const [albums, total] = await Promise.all([
      this.prisma.album.findMany({
        skip,
        take,
        orderBy: { createdAt: 'desc' }, 
      }),
      this.prisma.album.count(), 
    ]);

    return {
      data: albums, 
      total,
      limit: take,
     };
  }

  async findOneAlbum(id: number): Promise<Album> {
    return this.prisma.album.findUnique({ where: { id } , include: { songs: true } });
  }

  async updateAlbum(id: number, data: CreateAlbumDto): Promise<Album> {
    const { thumnail_url, album_name, description, songs } = data;


  const updatedAlbum = await this.prisma.album.update({
    where: { id },
    data: {
      thumnail_url,
      album_name,
      description,
    },
    include: { songs: true }, 
  });

  const currentSongs = updatedAlbum.songs; 

  const upsertPromises = songs.map(song => {
    if (song.id) {
      return this.prisma.song.update({
        where: { id: song.id },
        data: {
          artist: song.artist,
          duration: song.duration,
          path: song.path,
          song_name: song.song_name,
          thumnail_url: song.thumnail_url,
        },
      });
    } else {
      return this.prisma.song.create({
        data: {
          artist: song.artist,
          duration: song.duration,
          path: song.path,
          song_name: song.song_name,
          thumnail_url: song.thumnail_url,
          album: { connect: { id } },
        },
      });
    }
  });

  await Promise.all(upsertPromises);

  const updatedSongIds = new Set(songs.filter(song => song.id).map(song => song.id));
  const songsToDelete = currentSongs.filter(song => !updatedSongIds.has(song.id));

  if (songsToDelete.length > 0) {
    await this.prisma.song.deleteMany({
      where: { id: { in: songsToDelete.map(song => song.id) } },
    });
  }

  return this.prisma.album.findUnique({
    where: { id },
    include: { songs: true }, 
  });
  }

  async deleteAlbum(id: number): Promise<Album> {
    return this.prisma.album.delete({ where: { id } });
  }
}
