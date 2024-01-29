import {IsDate, IsNotEmpty, IsOptional, IsString, Length} from 'class-validator';
import {Publication} from '../../publication';
import {Credential} from '../../../../security/model';
import {ApiProperty} from '@nestjs/swagger';

export class CommentCreatePayload{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(1,250)
    content : string;

    @ApiProperty()
    @IsNotEmpty()
    publication : Publication;
}