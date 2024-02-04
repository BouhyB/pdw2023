import {TypePublicationEnum} from '../enum/type-publication.enum';
import {Base} from '../../../../shared/core/model/base.model';

export interface Publication extends Base{
  publication_id : string;
  content : string;
  type : TypePublicationEnum;
}
