import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {SignUpPayload} from '../data/payload/sign-up.payload';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent {
  private readonly authService: AuthService = inject(AuthService);
  public formGroup: FormGroup = new FormGroup<any>({
      mail : new FormControl('', [Validators.required, Validators.email]),
      username : new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
      password : new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
      passwordVerify : new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
    }
  )

  save():void{
    const payload : SignUpPayload = {...this.formGroup.value}
    console.log('mon payload', this.formGroup.value)
    if(this.formGroup.valid){
      this.authService.signUp(payload).subscribe();
    }else{
      if(payload.mail.length == 0) {
        alert('Mail vide')
      }
      if(payload.username.length == 0) {
        alert('Username vide')
      }
      if(payload.password.length == 0) {
        alert('Username vide')
      }
    }
  }

  private verifyPassword(){
    //let password:string = this.formGroup.value.
  }

}
