import {Payload} from '@shared';

export interface ProfilePayload extends Payload{
  //pictureProfile: string;
  description: string;
  firstName: string;
  lastName: string;
  mail: string;
}
