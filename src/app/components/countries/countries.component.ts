import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Countries } from "./countries.interface";
import { ApiService } from 'src/app/services/api.service';
import { LoadOnScrollService } from '../../services/load-on-scroll.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SearchbarComponent } from '../searchbar/searchbar.component';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, SearchbarComponent],
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})

export class CountriesComponent {
  countries: Countries[] = [];
  isLoading: boolean = true;
  error: boolean = false;
  displayedCountries: any[] = [];
  itemsPerPage: number = 50;
  currentBatch: number = 0;
  noMatchFound: boolean = false;
  ongoingSearch: boolean = false;
  filteredCountries: any[] = [];

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

  onScroll = () => {
    if(this.loadOnScrollService.isScrolledToBottom(this.countriesContainer)) {
      this.displayedCountries = this.ongoingSearch ?
        this.loadOnScrollService.handleScrollEvent(this.filteredCountries, this.currentBatch, this.itemsPerPage, this.displayedCountries)
        :
        this.loadOnScrollService.handleScrollEvent(this.countries, this.currentBatch, this.itemsPerPage, this.displayedCountries)
    }
  }

  searchCountries = (inputValue: string):void  => {
    this.filteredCountries = [];
    this.ongoingSearch = true;
    this.countries.forEach(country => {
      country.name === inputValue || country.name.includes(inputValue) ? this.filteredCountries.push(country) : '';
      // TODO: maybe make search work even if text is Uppercase (make "bob" match "Bob")
    })
    this.displayedCountries = this.filteredCountries.slice(0, this.itemsPerPage);
    this.noMatchFound = !this.displayedCountries?.length ?? true;
  }
}
