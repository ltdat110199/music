import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SongService } from './song.service';
import { Prisma } from '@prisma/client';

@Controller('songs')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post()
  createSong(@Body() data: Prisma.SongCreateInput) {
    return this.songService.createSong(data);
  }

  @Get()
  findAllSongs() {
    return this.songService.findAllSongs();
  }

  @Get(':id')
  findOneSong(@Param('id') id: number) {
    return this.songService.findOneSong(id);
  }

  @Put(':id')
  updateSong(@Param('id') id: number, @Body() data: Prisma.SongUpdateInput) {
    return this.songService.updateSong(id, data);
  }

  @Delete(':id')
  deleteSong(@Param('id') id: number) {
    return this.songService.deleteSong(id);
  }
}
