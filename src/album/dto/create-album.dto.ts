// album.dto.ts
import { IsArray, IsOptional, IsString, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

class SongDto {
  id: number;


  @IsString()
  artist: string;

  @IsString()
  path: string;

  @IsString()
  song_name: string;

  @IsString()
  thumnail_url: string;

  @IsOptional()
  duration?: number;
}

export class CreateAlbumDto {
  @IsString()
  thumnail_url: string;

  @IsString()
  album_name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @Type(() => SongDto)
  songs: SongDto[];
}
