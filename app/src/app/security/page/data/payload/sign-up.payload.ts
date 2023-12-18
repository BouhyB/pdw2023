import {Payload} from '@shared';

export interface SignUpPayload extends Payload{
  mail: string
  username: string
  password: string
  passwordVerify: string
}
