import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Payments } from '../payments/payments.interface';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TitleComponent } from '../title/title.component';

@Component({
  selector: 'app-payments-details',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, TitleComponent],
  templateUrl: './payments-details.component.html',
  styleUrls: ['./payments-details.component.scss']
})
export class PaymentsDetailsComponent {
  payments: Payments[] = [];
  isLoading: boolean = true;
  error: boolean = false;
  queryParams: any = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
    ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.queryParams = params['params'];
    });
    this.fetchCountries(this.formatQueryParams(this.queryParams));
  }

  formatQueryParams = (queryParams: string): any => {
    const params: string[] = queryParams.split(',');
    const formattedParams: string[] = [];
    params.forEach(param => {
      const formattedParam: string = 'type=' + param;
      formattedParams.push(formattedParam);
    })
    return formattedParams.join('&');
  }

  fetchCountries(queryParams: any) {
    this.apiService.getData('/payments/?' + queryParams).subscribe({
      next: (data: Payments[]) => {
        this.payments = data;
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
}
