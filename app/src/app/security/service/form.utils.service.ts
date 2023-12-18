import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignInUpField, SignInUpFormConfig} from '../data';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  public static signUpFormGroup(): FormGroup{
    return new FormGroup<any>({
      mail: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
      passwordVerify: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
    })

  }

  public static signInFormGroup(): FormGroup{
    return new FormGroup<any>({
      username: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
    })
}

  public static signInFormConfig():SignInUpFormConfig {
    const formGroup:FormGroup = FormUtilsService.signInFormGroup()
    return {
      formGroup,
      type : 'SIGN_IN',
      fields:[
        FormUtilsService.getUsernameField(formGroup),
        FormUtilsService.getPasswordField(formGroup)
      ]
    };
  }
  public static signUpFormConfig(): SignInUpFormConfig {
    const formGroup:FormGroup = FormUtilsService.signUpFormGroup()
    return {
      formGroup,
      type : 'SIGN_UP',
      fields:[
        FormUtilsService.getMailField(formGroup),
        FormUtilsService.getUsernameField(formGroup),
        FormUtilsService.getPasswordField(formGroup),
        FormUtilsService.getPasswordVerifyField(formGroup),
        ]
    };
  }

  public static getUsernameField(formGroup:FormGroup) : SignInUpField{
    return {
      label:'username',
      inputType: 'test',
      placeHolder:'Entrez votre identifiant',
      control:FormUtilsService.getFormControl(formGroup, 'username')
    }
  }

  public static getPasswordField(formGroup:FormGroup) : SignInUpField{
    return {
      label:'password',
      inputType: 'password',
      placeHolder:'Entrez votre mot de passe',
      control:FormUtilsService.getFormControl(formGroup, 'password')
    }
  }
  public static getPasswordVerifyField(formGroup:FormGroup) : SignInUpField{
    return {
      label:'passwordVerify',
      inputType: 'password',
      placeHolder:'Entrez à nouveau votre mot de passe',
      control:FormUtilsService.getFormControl(formGroup, 'passwordVerify')
    }
  }
  public static getMailField(formGroup:FormGroup) : SignInUpField{
    return {
      label:'mail',
      inputType: 'test',
      placeHolder:'Entrez votre email',
      control:FormUtilsService.getFormControl(formGroup, 'mail')
    }
  }

  public static getFormControl(formGroup : FormGroup, controlName: string): FormControl{
    return formGroup.get('username') as FormControl
  }
}
