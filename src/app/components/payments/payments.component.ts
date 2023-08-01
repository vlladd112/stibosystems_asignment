import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { Payments } from './payments.interface';
import { LoadOnScrollService } from '../../services/load-on-scroll.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SearchbarComponent } from '../searchbar/searchbar.component';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, SearchbarComponent],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})

export class PaymentsComponent {
  payments: Payments[] = [];
  isLoading: boolean = true;
  error: boolean = false;
  displayedPayments: any[] = [];
  itemsPerPage = 50;
  currentBatch = 0;

  @ViewChild('paymentsContainer', { read: ElementRef }) paymentsContainerRef!: ElementRef;
  private paymentsContainer!: HTMLElement;

  constructor(
    private apiService: ApiService,
    private loadOnScrollService: LoadOnScrollService
    ) {}

  ngOnInit() {
    this.fetchPayments();
  }

  ngAfterViewInit() {
    this.paymentsContainer = this.paymentsContainerRef.nativeElement;
  }

  fetchPayments() {
    this.apiService.getData('/payments').subscribe({
      next: (data: Payments[]) => {
        this.payments = data;
        this.displayedPayments = this.payments.slice(0, this.itemsPerPage);
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

  handleScrollEvent() {
    if (this.loadOnScrollService.isScrolledToBottom(this.paymentsContainer)) {
      this.displayedPayments = this.loadOnScrollService.loadNextBatch(this.currentBatch, this.itemsPerPage, this.payments, this.displayedPayments);
    }
  }
}
