import { Component, inject, OnInit } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { DAYS, Day, TIME_SLOTS, WeeklySchedule } from '../../../models/doctor.models';

@Component({
  selector: 'app-weekly-schedule',
  standalone: true,
  imports: [],
  templateUrl: './weekly-schedule.component.html',
  styleUrls: ['./weekly-schedule.component.scss']
})
export class WeeklyScheduleComponent implements OnInit {
  private svc = inject(DoctorService);

  readonly days = DAYS;
  readonly timeSlots = TIME_SLOTS;
  schedule: WeeklySchedule = {} as WeeklySchedule;
  saved = false;

  ngOnInit(): void {
    this.schedule = this.svc.getWeeklySchedule();
  }

  isAvailable(day: Day, time: string): boolean {
    return this.schedule[day]?.includes(time) ?? false;
  }

  toggleSlot(day: Day, time: string): void {
    const slots = this.schedule[day];
    const idx = slots.indexOf(time);
    if (idx > -1) slots.splice(idx, 1);
    else { slots.push(time); slots.sort(); }
  }

  slotCount(day: Day): number {
    return this.schedule[day]?.length ?? 0;
  }

  save(): void {
    this.svc.saveWeeklySchedule(this.schedule);
    this.saved = true;
    setTimeout(() => this.saved = false, 3000);
  }
}
