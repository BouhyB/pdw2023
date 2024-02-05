import { CommonModule } from '@angular/common';
import {delay, Observable, of, tap} from 'rxjs';
import {Component, computed, effect, inject, Input, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {ProfileService} from '../../service';
import {findMember} from '@angular/compiler-cli/src/ngtsc/reflection/src/typescript';
import {Profile} from '../../data';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-member-detail-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent{
  readonly profileService = inject(ProfileService);

  detail$: Observable<Profile> | undefined = this.profileService.getDetail();

  modifyProfile() {
    this.profileService.modifyProfile()
  }
}


