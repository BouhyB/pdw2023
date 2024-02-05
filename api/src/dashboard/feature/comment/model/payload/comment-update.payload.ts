import {IsDate, IsNotEmpty, IsOptional, IsString, Length} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CommentUpdatePayload{

    @ApiProperty()
    @Length(26,26)
    comment_id : string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(1,250)
    content : string;

    @ApiProperty()
    @IsNotEmpty()
    credential_id: string;

    @ApiProperty()
    @IsNotEmpty()
    publication_id : string
}