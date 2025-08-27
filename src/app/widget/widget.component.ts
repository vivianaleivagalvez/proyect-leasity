import { Component, HostListener, input } from '@angular/core';
import { Widget } from '../models/dashboard';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss'
})
export class WidgetComponent {

  isMobile = false;

 topCards = [
  { icon: 'book', title: 'Analista Programador', value: 'Duoc UC, 2017', bgClass: 'bg-0' },
  { icon: 'home', title: 'Vive en', value: 'Santiago, Chile', bgClass: 'bg-2' },
  { icon: 'email', title: 'Correo', value: 'viviana_leiva', bgClass: 'bg-3' },
];


  activeUsers = [
    { name: 'Juan Pérez' },
    { name: 'Ana Gómez' },
  ];

  inactiveUsers = [
    { name: 'Carlos Ramírez' },
    { name: 'Laura Ríos' },
  ];

  extraCards = [
    { title: 'Reporte 1', content: 'Contenido del reporte 1' },
    { title: 'Reporte 2', content: 'Contenido del reporte 2' },
  ];

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }
}


