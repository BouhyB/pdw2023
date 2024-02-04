import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileService} from '@dashboard';
import {Observable} from 'rxjs';
import {Profile} from '../../data/model/profile.model';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {values} from 'lodash';
import {ProfilePayload} from '../../data/payload/profile.payload';

@Component({
  selector: 'app-profile-update-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile-update-page.component.html',
  styleUrls: ['./profile-update-page.component.scss']
})
export class ProfileUpdatePageComponent implements OnInit{
  readonly profileService = inject(ProfileService);

  public formGroupUpdate: FormGroup = new FormGroup<any>({
      description : new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]),
      lastname : new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]),
      firstname : new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]),
      mail : new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]),
      picture : new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]),
    }
  );
  ngOnInit(): void {
    this.profileService.getDetail().subscribe((value: Profile) =>
      this.formGroupUpdate.setValue({description : value.description, lastname : value.lastname, firstname : value.firstname, mail: value.mail, picture: value.picture}));
  }


  update(){
    const payload : ProfilePayload = {...this.formGroupUpdate.value}
    if(this.formGroupUpdate.valid){
      this.profileService.update(payload).subscribe();
    }
  }


}
