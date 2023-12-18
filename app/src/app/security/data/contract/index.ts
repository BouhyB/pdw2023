import {FormControl, FormGroup} from '@angular/forms';

export interface SignInUpFormConfig{
  formGroup: FormGroup;
  type: string;
  fields: SignInUpField[];
}

export interface SignInUpField{
  label: string;
  placeHolder: string;
  inputType:string;
  control: FormControl;
}
