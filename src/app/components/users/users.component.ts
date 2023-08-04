import { Component, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Users } from './users.interface';
import { ApiService } from '../../services/api.service';
import { LoadOnScrollService } from '../../services/load-on-scroll.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { ContentComponent } from '../content/content.component';
import { ListComponent } from '../list/list.component';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, SearchbarComponent, ContentComponent, ListComponent, ListItemComponent],
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
  displayedKeys: string[] = ['firstName', 'lastName'];

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

  onScroll = () => {
    if(this.loadOnScrollService.isScrolledToBottom(this.usersContainer)) {
      this.displayedUsers = this.ongoingSearch ?
        this.loadOnScrollService.handleScrollEvent(this.filteredUsers, this.currentBatch, this.itemsPerPage, this.displayedUsers)
        :
        this.loadOnScrollService.handleScrollEvent(this.users, this.currentBatch, this.itemsPerPage, this.displayedUsers)
    }
  }

  searchUsers = (inputValue: string):void  => {
    this.filteredUsers = [];
    this.ongoingSearch = true;
    this.users.forEach(user => {
      user.firstName === inputValue || user.firstName.includes(inputValue) ? this.filteredUsers.push(user) : '';
      // TODO: maybe make search work even if text is Uppercase (make "bob" match "Bob")
    })
    this.displayedUsers = this.filteredUsers.slice(0, this.itemsPerPage);
    this.noMatchFound = !this.displayedUsers?.length ?? true;
  }
}
