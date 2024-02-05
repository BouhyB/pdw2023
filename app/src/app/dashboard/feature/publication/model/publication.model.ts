import {TypePublicationEnum} from '../enum/type-publication.enum';
import {Base} from '@shared';
import {Credential} from '@security';

export interface Publication extends Base{
  publication_id : string;
  content : string;
  type : TypePublicationEnum;
  credential : Credential
}
