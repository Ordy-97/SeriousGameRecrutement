import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-navbar',
  imports: [],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css',
})
export class AdminNavbarComponent {
  @Input() titlePage!: string;
}
