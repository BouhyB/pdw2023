import {IsDate, IsNotEmpty, IsOptional, IsString, Length} from 'class-validator';
import {TypePublicationEnum} from '../enum/type-publication.enum';
import {Credential} from '../../../../../security/model';

export class PublicationUpdatePayload {

    @IsNotEmpty()
    @Length(26, 26)
    publication_id : string;
    @IsString()
    @IsNotEmpty()
    @Length(1, 250)
    content : string;
    @IsOptional()
    type : TypePublicationEnum;

}