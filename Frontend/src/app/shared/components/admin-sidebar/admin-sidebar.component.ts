import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { RouterModule } from '@angular/router';
import {
  octHome,
  octHomeFill,
  octPerson,
  octPersonFill,
  octPersonAdd,
} from '@ng-icons/octicons';
import {
  remixPencilLine,
  remixPencilFill,
  remixLineChartLine,
  remixLineChartFill,
  remixQuestionLine,
  remixQuestionFill,
  remixErrorWarningLine,
  remixErrorWarningFill,
  remixLogoutBoxLine,
  remixLogoutBoxFill,
} from '@ng-icons/remixicon';
import { NgFor } from '@angular/common';
import path from 'node:path';
import { AuthService } from '../../../admin/auth-service/auth.service';

@Component({
  selector: 'app-admin-sidebar',
  imports: [NgIconComponent, NgFor, RouterModule],
  viewProviders: [
    provideIcons({
      octHome,
      octHomeFill,
      octPerson,
      octPersonFill,
      octPersonAdd,
      remixPencilLine,
      remixPencilFill,
      remixLineChartLine,
      remixLineChartFill,
      remixQuestionLine,
      remixQuestionFill,
      remixErrorWarningLine,
      remixErrorWarningFill,
      remixLogoutBoxLine,
      remixLogoutBoxFill,
    }),
  ],
  providers: [AuthService],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css',
})
export class AdminSidebarComponent {
  hoveredMenu = -1;
  hoveredIndex = -1; // -1 signifie qu'aucun élément n'est survolé
  hoverLogOut = false;

  constructor(private authService: AuthService) {}

  logOut() {
    this.authService.logout();
  }

  setHovered(index: number, menuIndex: number): void {
    this.hoveredIndex = index;
    this.hoveredMenu = menuIndex;
  }

  resetHovered(): void {
    this.hoveredIndex = -1;
    this.hoveredMenu = -1;
  }

  menuItems = [
    {
      title: '',
      elements: [
        {
          label: 'Acceuil',
          iconDefault: 'octHome',
          iconHover: 'octHomeFill',
          path: '/admin/home',
        },
        {
          label: 'Profil',
          iconDefault: 'octPerson',
          iconHover: 'octPersonFill',
          path: '/admin/profile',
        },
        {
          label: "Utilisateur",
          iconDefault: 'octPersonAdd',
          iconHover: 'octPersonAdd',
          path: '/admin/add-user',
        },
      ],
    },
    {
      title: 'Gestion des Tests',
      elements: [
        {
          label: 'Test',
          iconDefault: 'remixPencilLine',
          iconHover: 'remixPencilFill',
          path: '/admin/test',
        },
        {
          label: 'Classement',
          iconDefault: 'remixLineChartLine',
          iconHover: 'remixLineChartFill',
          path: '/admin/ranking',
        },
      ],
    },
    {
      title: 'SUPPORT',
      elements: [
        {
          label: 'FAQ',
          iconDefault: 'remixQuestionLine',
          iconHover: 'remixQuestionFill',
          path: '/admin/faq',
        },
        {
          label: 'Conseils & astuces',
          iconDefault: 'remixErrorWarningLine',
          iconHover: 'remixErrorWarningFill',
          path: '/admin/tips',
        },
      ],
    },
  ];
}
