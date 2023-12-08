import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputComponent} from '../../../shared/ui/form/component/input/input.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignInForm} from '../../data/form/sign-in-form';
import {ApiCodeResponse} from '@api';
import {
  FloatingLabelInputComponent
} from '../../../shared/ui/form/component/floating-label-input/floating-label-input.component';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [CommonModule, InputComponent, FloatingLabelInputComponent],
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent {
  formGroup = new FormGroup<SignInForm>(<SignInForm>{
    username: new FormControl<string>('', [Validators.required, Validators.minLength(1),
      Validators.maxLength(10)]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(1),
      Validators.maxLength(10)]),
  })

  get(key:string):FormControl<any>{
    return this.formGroup.get(key)! as FormControl<any>;
  }
  private initFormGroup(): void {
    let formGroup = new FormGroup({
      username: new FormControl<string>('', [Validators.required, Validators.minLength(1),
        Validators.maxLength(10)]),
      password: new FormControl<string>('', [Validators.required])
    })
    this.formGroup.valueChanges.subscribe(() => console.log('formGroupValue',
      this.formGroup.value));
  }

  protected readonly encodeURI = encodeURI;
}
