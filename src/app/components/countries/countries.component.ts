import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Countries } from "./countries.interface";
import { ApiService } from 'src/app/services/api.service';
import { LoadOnScrollService } from '../../services/load-on-scroll.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { ContentComponent } from '../content/content.component';
import { ListComponent } from '../list/list.component';
import { CountriesListComponent } from '../countries-list/countries-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, SearchbarComponent, ContentComponent, ListComponent, CountriesListComponent],
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
  selectedCountries: any[] = [];
  queryParams: string[] = [];

  @ViewChild('countriesContainer', { read: ElementRef }) paymentsContainerRef!: ElementRef;
  private countriesContainer!: HTMLElement;

  constructor(
    private apiService: ApiService,
    private loadOnScrollService: LoadOnScrollService,
    private router: Router
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

  onScroll = (usersContainer: any):void => {
    if(this.loadOnScrollService.isScrolledToBottom(usersContainer)) {
      this.displayedCountries = this.ongoingSearch ?
        this.loadOnScrollService.handleScrollEvent(this.filteredCountries, this.currentBatch, this.itemsPerPage, this.displayedCountries)
        :
        this.loadOnScrollService.handleScrollEvent(this.countries, this.currentBatch, this.itemsPerPage, this.displayedCountries)
        if(this.selectedCountries.length) {
          this.displayedCountries.forEach(user => {
            this.selectAlreadyCheckedItems(user.id);
          })
        }
    }
  }

  searchCountries = (inputValue: string):void  => {
    this.filteredCountries = [];
    this.ongoingSearch = true;
    this.countries.forEach(country => {
      country.name === inputValue || country.name.includes(inputValue) ? this.filteredCountries.push(country) : '';
      country.name?.toLowerCase().includes(inputValue) ? this.filteredCountries.push(country) : '';
      if(this.selectedCountries.length) {
        this.selectAlreadyCheckedItems(country.id);
      }
    })
    this.displayedCountries = this.filteredCountries.slice(0, this.itemsPerPage);
    this.noMatchFound = !this.displayedCountries?.length ?? true;
  }

  selectCountries = (checked: boolean, id: string) => {
    checked ? this.selectedCountries.push(id) : this.selectedCountries.splice(this.selectedCountries.indexOf(id), 1);
  }

  selectAlreadyCheckedItems = (id: string): void => {
    if(this.selectedCountries.includes(id)) {
      setTimeout(() => {
        document.getElementById(id)?.setAttribute('checked', 'true');
      })
    }
  }

  continueToDetails = ():void => {
    this.router.navigate(['countries/details'], { queryParams: { params: this.selectedCountries.join(',') } });
  }
}
