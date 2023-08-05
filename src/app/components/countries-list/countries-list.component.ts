import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-countries-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss']
})
export class CountriesListComponent {
  @Input()
  items!: any;
  @Input() action!: (checked: boolean, id: string) => void;

  checkAction(e: any):void {
    this.action(e.target.checked, e.target.id);
  }
}
