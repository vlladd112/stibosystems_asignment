import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Countries } from "./countries.interface";
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})

export class CountriesComponent {
  countries: Countries[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getData('/countries').subscribe((data: Countries[]) => {
      this.countries = data;
    })
  }
}
