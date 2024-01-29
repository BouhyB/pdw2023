import {Column, CreateDateColumn} from 'typeorm';
import {TypePublicationEnum} from '../enum/type-publication.enum';
import {IsDate, IsNotEmpty, IsOptional, IsString, Length} from 'class-validator';
import {Credential} from '../../../../../security/model';
import {ApiProperty} from '@nestjs/swagger';
import {Exclude} from 'class-transformer';

export class PublicationCreatePayload {


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(1, 250)
    content : string;
    @ApiProperty()
    @IsOptional()
    @ApiProperty()
    type : TypePublicationEnum;
}