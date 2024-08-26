// update-album.dto.ts
import { IsOptional, IsString, IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SongDto {
  @IsInt()
  id: number;

  @IsString()
  @IsOptional()
  song_name?: string;

  @IsString()
  @IsOptional()
  artist?: string;

  @IsInt()
  @IsOptional()
  duration?: number;

  @IsString()
  @IsOptional()
  path?: string;

  @IsString()
  @IsOptional()
  thumnail_url?: string;
}

export class UpdateAlbumDto {
  @IsInt()
  id: number;

  @IsString()
  @IsOptional()
  album_name?: string;

  @IsString()
  @IsOptional()
  thumnail_url?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SongDto)
  @IsOptional()
  add_songs?: SongDto[];

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  remove_song_ids?: number[];
}
