import { CommonModule } from '@angular/common';
import {delay, of, tap} from 'rxjs';
import {Component, computed, effect, inject, Input, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {ProfileService} from '../../service/profile.service';
import {findMember} from '@angular/compiler-cli/src/ngtsc/reflection/src/typescript';

@Component({
  selector: 'app-member-detail-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit{
  @Input() id!: string;
  readonly profileService = inject(ProfileService);

  detail$: Signal<string> = computed(() => this.profileService.List$().find(m => m === this.id) || 'not found');
  ngOnInit(): void {
    this.profileService.getDetail();
  }

}


