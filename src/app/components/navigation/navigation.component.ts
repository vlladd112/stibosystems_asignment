import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavEntryComponent } from '../nav-entry/nav-entry.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, NavEntryComponent],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

}
