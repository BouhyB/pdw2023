import {Component, inject, Input, OnInit, signal, WritableSignal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {SignInUpFormConfig} from '../../data';
import {config, Observable} from 'rxjs';
import {ApiResponse} from '@api';
import {AuthService} from '../../service';
import {SignInPayload} from '../../page';
import {Payload} from '@shared';
import {SignUpPayload} from '../../page';

@Component({
  selector: 'app-sign-in-up-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in-up-form.component.html',
  styleUrls: ['./sign-in-up-form.component.scss']
})
export class SignInUpFormComponent implements OnInit{
  @Input({required:true})config!:SignInUpFormConfig ;
  private readonly authService : AuthService = inject(AuthService);
  title:string =  'Connexion';
  btnLabel:string = 'Se connecter' ;

  error$: WritableSignal<string> = signal('');
  ngOnInit() {

    this.title= this.config.type === 'SIGN_IN' ? 'Connexion' : 'Inscription';
    this.btnLabel = this.config.type === 'SIGN_IN' ? 'Se connecter' : 'S\'inscrire';
  }

  save(){
    this.error$.set('');
    //if (this.config.formGroup.valid){
      const payload: Payload = {...this.config.formGroup.value};
      const obs:Observable<ApiResponse> = this.config.type === 'SIGN_IN' ?
        this.authService.signIn(payload as SignInPayload): this.authService.signUp(payload as SignUpPayload);

      obs.subscribe((data: ApiResponse) => console.log('apiResponse', data));

    //}else{
     // this.error$.set('Formulaire non valide');
    //}
  }

}
