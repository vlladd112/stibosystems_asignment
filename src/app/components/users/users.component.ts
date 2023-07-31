import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Users } from './users.interface';
import { ApiService } from '../../services/api.service';
import { LoadOnScrollService } from '../../services/load-on-scroll.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users: Users[] = [];
  isLoading: boolean = true;
  error: boolean = false;
  displayedUsers: any[] = [];
  itemsPerPage = 50;
  currentBatch = 0;

  @ViewChild('usersContainer', { read: ElementRef }) usersContainerRef!: ElementRef;
  private usersContainer!: HTMLElement;

  constructor(
    private apiService: ApiService,
    private loadOnScrollService: LoadOnScrollService
    ) {}

  ngOnInit() {
    this.fetchUsers();
  }

  ngAfterViewInit() {
    this.usersContainer = this.usersContainerRef.nativeElement;
  }

  fetchUsers() {
    this.apiService.getData('/users').subscribe({
      next: (data: Users[]) => {
        this.users = data;
        this.displayedUsers = this.users.slice(0, this.itemsPerPage);
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
    if (this.loadOnScrollService.isScrolledToBottom(this.usersContainer)) {
      this.displayedUsers = this.loadOnScrollService.loadNextBatch(this.currentBatch, this.itemsPerPage, this.users, this.displayedUsers);
    }
  }
}
