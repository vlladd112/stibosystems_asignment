import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Users } from '../users/users.interface';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  users: Users[] = [];
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
    this.fetchUsers(this.formatQueryParams(this.queryParams));
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

  fetchUsers(queryParams: any) {
    this.apiService.getData('/users/?' + queryParams).subscribe({
      next: (data: Users[]) => {
        this.users = data;
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
