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
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css',
})
export class AdminSidebarComponent {
  hoveredMenu = -1;
  hoveredIndex = -1; // -1 signifie qu'aucun élément n'est survolé
  hoverLogOut = false;

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
          label: 'Home',
          iconDefault: 'octHome',
          iconHover: 'octHomeFill',
          path: '/admin',
        },
        {
          label: 'Profile',
          iconDefault: 'octPerson',
          iconHover: 'octPersonFill',
          path: '/admin/profile',
        },
        {
          label: 'Add user',
          iconDefault: 'octPersonAdd',
          iconHover: 'octPersonAdd',
          path: '/admin/add-user',
        },
      ],
    },
    {
      title: 'TEST MANAGEMENT',
      elements: [
        {
          label: 'Test',
          iconDefault: 'remixPencilLine',
          iconHover: 'remixPencilFill',
          path: '/admin/test',
        },
        {
          label: 'Ranking',
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
          label: 'Tips & Tricks',
          iconDefault: 'remixErrorWarningLine',
          iconHover: 'remixErrorWarningFill',
          path: '/admin/tips',
        },
      ],
    },
  ];
}
