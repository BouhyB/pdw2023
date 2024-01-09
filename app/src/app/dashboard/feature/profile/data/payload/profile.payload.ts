import {Payload} from '@shared';

export interface ProfilePayload extends Payload{
  pictureProfile: string;
  description: string;
  status: string;
  firstName: string;
  lastName: string;
  mail: string;
}
