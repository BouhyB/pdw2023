import {Payload} from '@shared';
import {TypePublicationEnum} from '../enum/type-publication.enum';

export interface PublicationPayload extends Payload{
  content : string;
  type : TypePublicationEnum;
}
