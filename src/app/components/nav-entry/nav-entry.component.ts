import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-entry',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-entry.component.html',
  styleUrls: ['./nav-entry.component.scss']
})
export class NavEntryComponent {
  @Input()
  text!: string;
}
