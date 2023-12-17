import {Payload} from '../../../../shared/core/model/type';

export interface RefreshPayload extends Payload{
  refresh: string;
}
