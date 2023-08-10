import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {
  @Input()
  action!: (text: string) => void;

  inputValue:string = '';

  inputText(e: any): void {
    this.inputValue = e.target.value;
    this.action(this.inputValue);
  }
}
