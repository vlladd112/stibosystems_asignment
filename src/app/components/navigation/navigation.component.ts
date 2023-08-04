import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavEntryComponent } from '../nav-entry/nav-entry.component';
import { RouterModule } from '@angular/router';
import { SearchbarComponent } from '../searchbar/searchbar.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, NavEntryComponent, SearchbarComponent],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

}
