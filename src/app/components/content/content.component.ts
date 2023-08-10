import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { ListComponent } from '../list/list.component';
import { RouterModule } from '@angular/router';
import { TitleComponent } from '../title/title.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, SearchbarComponent, ListComponent, RouterModule, TitleComponent, ButtonComponent],
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
