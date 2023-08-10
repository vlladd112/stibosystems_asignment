import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { Payments } from './payments.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ContentComponent } from '../content/content.component';
import { ListComponent } from '../list/list.component';
import { PaymentsListComponent } from '../payments-list/payments-list.component';
import { Router } from '@angular/router';
import { TitleComponent } from '../title/title.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, ContentComponent, ListComponent, PaymentsListComponent, TitleComponent, ButtonComponent],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})

export class PaymentsComponent {
  payments: Payments[] = [];
  isLoading: boolean = true;
  error: boolean = false;
  displayedPayments: any = {};
  noMatchFound: boolean = false;
  statusCounts: any = {};
  statuses: any = {};
  status: string = '';
  selectedPayments: any[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router
    ) {}

  ngOnInit() {
    this.fetchPayments();
  }

  fetchPayments() {
    this.apiService.getData('/payments').subscribe({
      next: (data: Payments[]) => {
        this.payments = data;
        this.payments.forEach(payment => {
          if (this.displayedPayments[payment.status]) {
            this.displayedPayments[payment.status]++;
          } else {
            this.displayedPayments[payment.status] = 1;
          }
        })
        this.isLoading = false;
      },
      error: (error: any) => {
        console.log(error);
        this.isLoading = false;
        this.error = true;
      },
      complete: () => {
        console.log('Data fetching complete.');
      }
    });
  }

  selectPayments = (checked: boolean, status: string) => {
    checked ? this.selectedPayments.push(status) : this.selectedPayments.splice(this.selectedPayments.indexOf(status), 1);
  }

  continueToDetails = ():void => {
    this.router.navigate(['payments/details'], { queryParams: { params: this.selectedPayments.join(',') } });
  }
}
