import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Users } from './users.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users: Users[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getData('/users').subscribe((data: Users[]) => {
      this.users = data;
    })
  }
}
