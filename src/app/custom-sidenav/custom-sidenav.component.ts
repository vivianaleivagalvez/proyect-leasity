import { Component, computed, Input, signal } from '@angular/core';

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
  sideNavCollapsed= signal(false);
  @Input() set collapsed(val: boolean){
    this.sideNavCollapsed.set(val);
  }



  menuItems = signal<MenuItem[]>([
    {
     icon: 'dashboard',
     label: 'Dashboard',
     router: 'widget'
    },
    {
     icon: 'person',
     label: 'Contact CRUD',
     router: 'contact'
    }
  ])


  profilePicSize = computed(() => this.sideNavCollapsed() ? '32': '100');

}
