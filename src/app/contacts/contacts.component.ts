import { Component } from '@angular/core';
import { IContactElement } from '../shared/contact-data.interface';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from './edit/edit.component';
import { ContactService } from '../shared/service/contact.service';




const ELEMENT_DATA: IContactElement[] = [
  {id: 1, name: 'Andres Colonia', email: 'andres@leasity.cl', dni: '17.395.120-5', label: ['Backend', 'Devops', 'Frontend']},
  {id: 2, name: 'Matías Batarce', email: 'matias@batarce.cl', dni: '18.545.293-k', label: ['Frontend', 'Backend', 'Diseño']},
];

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  displayedColumns: string[] = ['name', 'email', 'dni', 'label', 'action'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog,
    private _contactService: ContactService
  )
  {
    
  }

  ngOnInit() {
  /* this._contactService.add(this.dataSource); */
}

  editContact(contact: IContactElement) {
    const dialogRef = this.dialog.open(EditComponent, {
      data: contact,
    });

    dialogRef.beforeClosed().subscribe(result => {
        if(result){
          if(contact){
            this._contactService.update({...result, id: contact.id});
          }
        }
    });

  }



}
