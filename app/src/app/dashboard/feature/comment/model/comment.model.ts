import {Publication} from '../../publication/model/publication.model';
import {Base} from '@shared';
import {Credential} from '@security';

export interface Comment  extends Base{
  comment_id : string;
  content : string;
  publication : Publication
  credential : Credential
}
