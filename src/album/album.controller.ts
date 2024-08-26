import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { Prisma } from '@prisma/client';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  createAlbum(@Body() data: CreateAlbumDto) {
    return this.albumService.createAlbum(data);
  }

  @Get()
  async findAllAlbums(
    @Query('page') page: string = '1', 
    @Query('limit') limit: string = '10', 
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Validate page and limit
    if (isNaN(pageNumber) || pageNumber < 1) {
      throw new Error('Invalid page number');
    }
    if (isNaN(limitNumber) || limitNumber < 1) {
      throw new Error('Invalid limit number');
    }

    return this.albumService.findAllAlbums(pageNumber, limitNumber);
  }

  @Get(':id')
  findOneAlbum(@Param('id') id: number) {
    return this.albumService.findOneAlbum(+id);
  }

  @Put(':id')
  updateAlbum(@Param('id') id: number, @Body() data: CreateAlbumDto) {
    return this.albumService.updateAlbum(+id, data);
  }

  @Delete(':id')
  deleteAlbum(@Param('id') id: number) {
    return this.albumService.deleteAlbum(+id);
  }
}
