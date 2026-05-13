import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-cards',
  standalone: true,
  imports: [],
  templateUrl: './stat-cards.component.html',
  styleUrls: ['./stat-cards.component.scss']
})
export class StatCardsComponent {
  @Input() todayCount  = 0;
  @Input() pendingCount = 0;
  @Input() unreadCount  = 0;
}
