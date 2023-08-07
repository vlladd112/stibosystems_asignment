import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payments-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.scss']
})
export class PaymentsListComponent {
  @Input()
  items!: any;
  @Input() action!: (checked: boolean, id: string) => void;

  checkAction(e: any):void {
    this.action(e.target.checked, e.target.id);
  }

  formatStatus(text: any) {
    const parts = text.charAt(0).toUpperCase() + text.slice(1).split('_').join(' ');
    return parts
  }
}
