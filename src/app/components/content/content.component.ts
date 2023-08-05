import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from '../searchbar/searchbar.component';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListComponent } from '../list/list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, SearchbarComponent, ListComponent, RouterModule],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  @Input()
  title!: string;
  @Input()
  selectedItems!: any[];
  @Input()
  queryParams!: any[];
  @Input()
  searchAction!: (text: string) => void;
  @Input()
  continue!: () => void;
}
