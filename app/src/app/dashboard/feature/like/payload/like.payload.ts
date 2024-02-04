import {Payload} from '@shared';
import {Publication} from '../../publication/model/publication.model';
import {Comment} from '../../comment/model/comment.model';

export interface LikePayload extends Payload {
  publication ?: Publication;
  comment ?: Comment;
}
