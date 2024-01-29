import {TypePublicationEnum} from '../enum/type-publication.enum';

export interface Publication {
  publication_id : string;
  content : string;
  type : TypePublicationEnum;
}
