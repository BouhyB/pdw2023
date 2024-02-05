import {Credential} from '@security';

export interface Profile{
  profile_id : string;
  picture : string;
  description : string;
  status : string;
  lastname : string;
  firstname : string;
  mail : string;
  credential: Credential;
}
