import {Publication} from '../../publication/model/publication.model';
import {Base} from '../../../../shared/core/model/base.model';

export interface Comment  extends Base{
  comment_id : string;
  content : string;
  publication : Publication
}
