import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputComponent} from '@shared';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  FloatingLabelInputComponent
} from '../../../shared/ui/form/component/floating-label-input/floating-label-input.component';
import {AuthService, FormUtilsService} from '../../service';
import {SignInUpFormComponent} from '../../component';
import {SignInUpFormConfig} from '../../data';
import {SignInPayload} from '../data';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [CommonModule, InputComponent, FloatingLabelInputComponent, ReactiveFormsModule, SignInUpFormComponent],
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent {
  //readonly config:SignInUpFormConfig = FormUtilsService.signInFormConfig();

  private readonly authService: AuthService = inject(AuthService);
  public formGroup: FormGroup = new FormGroup<any>({
    username : new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
    password : new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(10)])
    }
  )


  save():void{
    const payload : SignInPayload = {...this.formGroup.value}
    console.log('mon payload', this.formGroup.value)
    if (this.formGroup.valid) {
      this.authService.signIn(payload).subscribe();

    } else {
      if (payload.username.length == 0) {
        alert('Username vide')
      }
      if (payload.password.length == 0) {
        alert('Password vide')
      }
    }
  }
}
