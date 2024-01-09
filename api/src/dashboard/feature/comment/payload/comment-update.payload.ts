import {IsDate, IsNotEmpty, IsOptional, IsString, Length} from 'class-validator';

export class CommentUpdatePayload{

    @Length(26,26)
    comment_id : string;
    @IsDate()
    @IsOptional()
    date_comment : Date;

    @IsString()
    @IsNotEmpty()
    @Length(1,250)
    content : string;

    @IsNotEmpty()
    @Length(26, 26)
    credential_id: string;

    @IsNotEmpty()
    @Length(26, 26)
    publication_id : string
}