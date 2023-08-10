import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Countries } from '../countries/countries.interface';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TitleComponent } from '../title/title.component';

@Component({
  selector: 'app-countries-details',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, TitleComponent],
  templateUrl: './countries-details.component.html',
  styleUrls: ['./countries-details.component.scss']
})
export class CountriesDetailsComponent {
  countries: Countries[] = [];
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
      const formattedParam: string = 'id=' + param;
      formattedParams.push(formattedParam);
    })
    return formattedParams.join('&');
  }

  fetchCountries(queryParams: any) {
    this.apiService.getData('/countries/?' + queryParams).subscribe({
      next: (data: Countries[]) => {
        this.countries = data;
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
