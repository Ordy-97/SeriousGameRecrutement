import { Routes } from '@angular/router';
import { AdminLoginComponent } from './admin/pages/admin-login/admin-login.component';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { RankingComponent } from './admin/pages/ranking/ranking.component';
import { TestComponent } from './admin/pages/test/test.component';
import {DescriptionComponent} from './admin/pages/description/description.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,

  },
  {
    path: 'description',
    component: DescriptionComponent
  },

  {
    path: 'admin/login',
    component: AdminLoginComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'ranking', component: RankingComponent },
      { path: 'test', component: TestComponent },
    ],
  },


];
