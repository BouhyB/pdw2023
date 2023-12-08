import {Component, computed, effect, Input, Signal, signal, WritableSignal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {delay, of, tap} from 'rxjs';

@Component({
  selector: 'app-member-detail-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-detail-page.component.html',
  styleUrls: ['./member-detail-page.component.scss']
})
export class MemberDetailPageComponent{
  @Input() id!:string;

  member: WritableSignal<string> = signal('no body');

  memberFirstNameLastname: Signal<string> = computed(() => `fake example of data extraction from object ${this.member()}`)

  memberEffect = effect(() => console.log(`Mon effect sur le member : ${this.member()}`));
  memberFirstNameLastNameEffect = effect(() => console.log(`Mon effect sur le memberFirstNameLastname : ${this.memberFirstNameLastname()}`));

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    of(this.member()).pipe(
      delay(5000),
      tap(() => this.member.set('Nicolas'))
    ).subscribe();
  }
}
