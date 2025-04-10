import { Routes } from '@angular/router';
import { AdminLoginComponent } from './admin/pages/admin-login/admin-login.component';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { RankingComponent } from './admin/pages/ranking/ranking.component';
import { TestComponent } from './admin/pages/test/test.component';
import { TestResponseComponent } from './candidat/testResponse/testResponse.component';
import { DescriptionComponent } from './candidat/description/description.component';
import { HomeComponent } from './admin/pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'candidat/description',
    pathMatch: 'full',
  },
  {
    path: 'candidat',
    children: [
      { path: 'description', component: DescriptionComponent },
      { path: 'testResponse', component: TestResponseComponent },
    ],
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
      { path: 'home', component: HomeComponent },
    ],
  },
];
