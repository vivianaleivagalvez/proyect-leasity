import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { WidgetComponent } from './widget/widget.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',  
    redirectTo: 'widget'
  },
  {
    path: 'widget',
    component: WidgetComponent
  },
  {
    path: 'contact',
    component: ContactsComponent
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
