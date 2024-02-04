import {Publication} from '../../../publication';
import {Comment} from '../../../comment';
import {ApiProperty} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';

export class LikePayload{
    @ApiProperty()
    @IsOptional()
    publication : Publication
    @ApiProperty()
    @IsOptional()
    comment : Comment

}