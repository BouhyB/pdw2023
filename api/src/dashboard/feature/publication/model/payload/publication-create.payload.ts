import {Column} from 'typeorm';
import {TypePublicationEnum} from '../enum/type-publication.enum';
import {IsDate, IsNotEmpty, IsOptional, IsString, Length} from 'class-validator';
import {Credential} from '../../../../../security/model';

export class PublicationCreatePayload {

    @IsDate()
    @IsOptional()
    date_publication : Date;
    @IsString()
    @IsNotEmpty()
    @Length(1, 250)
    content : string;
    @IsOptional()
    type : TypePublicationEnum;
    @IsNotEmpty()
    @Length(26, 26)
    credential : Credential;
}