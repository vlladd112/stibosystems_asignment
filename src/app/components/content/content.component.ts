import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from '../searchbar/searchbar.component';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, SearchbarComponent, ListComponent],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  @Input()
  title!: string;
  @Input()
  items!: any;
  @Input()
  displayedItems!: any;
  @Input()
  isLoading!: boolean;
  @Input()
  error!: boolean;
  @Input()
  noMatchFound!: boolean;
  @Input()
  listItem!: any;
  @Input()
  action!: (text: string) => void;

}
