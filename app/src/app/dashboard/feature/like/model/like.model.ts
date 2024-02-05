import {Base} from '@shared';
import {Publication} from '../../publication/model/publication.model';
import {Comment} from '../../comment/model/comment.model';

export interface Like extends Base{
  like_id :string;
  publication ?: Publication;
  comment ?:Comment
}
