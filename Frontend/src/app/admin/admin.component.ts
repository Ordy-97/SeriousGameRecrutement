import { Component, EventEmitter } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AdminNavbarComponent } from '../shared/components/admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from '../shared/components/admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-admin',
  imports: [
    RouterOutlet,
    RouterModule,
    AdminNavbarComponent,
    AdminSidebarComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  pageTitle = 'ADMIN';

  setTitlePage(componentInstance: any) {
    if ('title' in componentInstance) {
      // Vérifie si le composant a une propriété 'title'
      this.pageTitle = componentInstance.title;
      console.log('Page title:', this.pageTitle);
    }
  }
}
