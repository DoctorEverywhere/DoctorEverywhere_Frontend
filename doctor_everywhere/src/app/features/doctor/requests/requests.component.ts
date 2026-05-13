import { Component, inject, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { DoctorRequest } from '../models/doctor.models';
import { RequestListComponent } from './components/request-list/request-list.component';

@Component({
  selector: 'app-doctor-requests',
  standalone: true,
  imports: [RequestListComponent],
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class DoctorRequestsComponent implements OnInit {
  private svc = inject(DoctorService);

  requests: DoctorRequest[] = [];
  loading = true;
  activeTab: 'pending' | 'accepted' | 'rejected' = 'pending';

  ngOnInit(): void {
    this.svc.getRequests().subscribe(r => { this.requests = r; this.loading = false; });
  }

  get pending():  DoctorRequest[] { return this.requests.filter(r => r.status === 'pending'); }
  get accepted(): DoctorRequest[] { return this.requests.filter(r => r.status === 'accepted'); }
  get rejected(): DoctorRequest[] { return this.requests.filter(r => r.status === 'rejected'); }

  get activeList(): DoctorRequest[] {
    return this.activeTab === 'pending'  ? this.pending
         : this.activeTab === 'accepted' ? this.accepted
         : this.rejected;
  }

  accept(id: string): void {
    this.svc.acceptRequest(id).subscribe(() => {
      const r = this.requests.find(x => x.id === id);
      if (r) r.status = 'accepted';
    });
  }

  reject(id: string): void {
    this.svc.rejectRequest(id).subscribe(() => {
      const r = this.requests.find(x => x.id === id);
      if (r) r.status = 'rejected';
    });
  }
}
