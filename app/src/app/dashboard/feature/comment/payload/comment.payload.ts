import {Payload} from '@shared';
import {Publication} from '../../publication/model/publication.model';


export interface CommentPayload extends Payload {
  content: string;
  publication: Publication;
}
