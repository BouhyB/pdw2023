import { CommonModule } from '@angular/common';
import {delay, of, tap} from 'rxjs';
import {Component, computed, effect, Input, Signal, signal, WritableSignal} from '@angular/core';

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

/*export class MemberDetailPageComponent implements OnInit {
  @Input() id!: string;
  readonly memberService = inject(MemberService);

  detail$: Signal<string> = computed(() => this.memberService.List$().find(m => m === this.id) || 'not found');
  ngOnInit(): void {
    this.getDetail();
  }
  private setDetail(): void {
    this.memberService.setDetail(this.id);
  }
}*/


