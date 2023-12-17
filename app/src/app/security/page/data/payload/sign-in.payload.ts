import {Payload} from '../../../../shared/core/model/type';

export interface SignInPayload extends Payload{
  username: string;
  password: string;
}
