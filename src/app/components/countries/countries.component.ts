import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Countries } from "./countries.interface";
import { ApiService } from 'src/app/services/api.service';
import { LoadOnScrollService } from '../../services/load-on-scroll.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})

export class CountriesComponent {
  countries: Countries[] = [];
  isLoading: boolean = true;
  error: boolean = false;
  displayedCountries: any[] = [];
  itemsPerPage = 50;
  currentBatch = 0;

  @ViewChild('countriesContainer', { read: ElementRef }) paymentsContainerRef!: ElementRef;
  private countriesContainer!: HTMLElement;

  constructor(
    private apiService: ApiService,
    private loadOnScrollService: LoadOnScrollService
    ) {}

  ngOnInit() {
    this.fetchCountries();
  }

  ngAfterViewInit() {
    this.countriesContainer = this.paymentsContainerRef.nativeElement;
  }

  fetchCountries() {
    this.apiService.getData('/countries').subscribe({
      next: (data: Countries[]) => {
        this.countries = data;
        this.displayedCountries = this.countries.slice(0, this.itemsPerPage);
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
    if (this.loadOnScrollService.isScrolledToBottom(this.countriesContainer)) {
      this.displayedCountries = this.loadOnScrollService.loadNextBatch(this.currentBatch, this.itemsPerPage, this.countries, this.displayedCountries);
    }
  }
}
