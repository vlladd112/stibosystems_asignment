import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  @Input()
  items!: any;
  @Input() action!: (checked: boolean, id: string) => void;

  checkAction(e: any):void {
    this.action(e.target.checked, e.target.id);
  }
}