import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { Payments } from './payments.interface';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})

export class PaymentsComponent {
  payments: Payments[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getData('/payments').subscribe((data: Payments[]) => {
      this.payments = data;
    })
  }
}
