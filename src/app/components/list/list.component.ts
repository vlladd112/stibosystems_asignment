import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input()
  dynamicTemplateRef!: TemplateRef<any>;
  @Input()
  displayedKeys!: string[];
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
