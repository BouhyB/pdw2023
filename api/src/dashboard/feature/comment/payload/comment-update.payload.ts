import {IsDate, IsNotEmpty, IsOptional, IsString, Length} from 'class-validator';
import {Publication} from '../../publication';
import {Credential} from '../../../../security/model';

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
    credential: Credential;

    @IsNotEmpty()
    publication : Publication
}