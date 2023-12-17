import {Payload} from '../../../../shared/core/model/type';

export interface SignUpPayload extends Payload{
  mail: string
  username: string
  password: string
}
