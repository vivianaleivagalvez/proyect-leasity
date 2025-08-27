import { Component, signal } from '@angular/core';

export type MenuItem = {
  icon: string;
  label: string;
  router?: string;
}

@Component({
  selector: 'app-custom-sidenav',
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss'
})
export class CustomSidenavComponent {

  menuItems = signal<MenuItem[]>([
    {
     icon: 'dashboard',
     label: 'Listado CRUD',
     router: 'contacts'
    }
  ])

}
