import {Publication} from '../../publication/model/publication.model';

export interface Comment{
  comment_id : string;
  content : string;
  publication : Publication
}
