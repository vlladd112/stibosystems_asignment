import { Component, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Users } from './users.interface';
import { ApiService } from '../../services/api.service';
import { LoadOnScrollService } from '../../services/load-on-scroll.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { ContentComponent } from '../content/content.component';
import { ListComponent } from '../list/list.component';
import { UsersListComponent } from '../users-list/users-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, SearchbarComponent, ContentComponent, ListComponent, UsersListComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  @ViewChild('innerContent') dynamicTemplate!: TemplateRef<any>;
  users: Users[] = [];
  isLoading: boolean = true;
  error: boolean = false;
  displayedUsers: any[] = [];
  itemsPerPage: number = 50;
  currentBatch: number = 0;
  noMatchFound: boolean = false;
  ongoingSearch: boolean = false;
  filteredUsers: any[] = [];
  selectedUsers: any[] = [];
  queryParams: string[] = [];

  @ViewChild('usersContainer', { read: ElementRef }) usersContainerRef!: ElementRef;

  constructor(
    private apiService: ApiService,
    private loadOnScrollService: LoadOnScrollService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchUsers();
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

  onScroll = (usersContainer: any):void => {
    if(this.loadOnScrollService.isScrolledToBottom(usersContainer)) {
      this.displayedUsers = this.ongoingSearch ?
        this.loadOnScrollService.handleScrollEvent(this.filteredUsers, this.currentBatch, this.itemsPerPage, this.displayedUsers)
        :
        this.loadOnScrollService.handleScrollEvent(this.users, this.currentBatch, this.itemsPerPage, this.displayedUsers)
        if(this.selectedUsers.length) {
          this.displayedUsers.forEach(user => {
            this.selectAlreadyCheckedItems(user.id);
          })
        }
    }
  }

  searchUsers = (inputValue: string):void  => {
    this.filteredUsers = [];
    this.ongoingSearch = true;
    this.users.forEach(user => {
      user.firstName?.toLowerCase().includes(inputValue) || user.lastName?.toLowerCase().includes(inputValue) ? this.filteredUsers.push(user) : '';
      if(this.selectedUsers.length) {
        this.selectAlreadyCheckedItems(user.id);
      }
    })
    this.displayedUsers = this.filteredUsers.slice(0, this.itemsPerPage);
    this.noMatchFound = !this.displayedUsers?.length ?? true;
  }

  selectUsers = (checked: boolean, id: string) => {
    checked ? this.selectedUsers.push(id) : this.selectedUsers.splice(this.selectedUsers.indexOf(id), 1);
  }

  selectAlreadyCheckedItems = (id: string): void => {
    if(this.selectedUsers.includes(id)) {
      setTimeout(() => {
        document.getElementById(id)?.setAttribute('checked', 'true');
      })
    }
  }

  continueToDetails = ():void => {
    this.router.navigate(['users/details'], { queryParams: { params: this.selectedUsers.join(',') } });
  }
}
