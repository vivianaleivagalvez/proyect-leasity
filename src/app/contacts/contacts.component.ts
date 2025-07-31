import { Component } from '@angular/core';
import { formatRut } from '@ftapiat/js-rut-utils';
import { IContactElement } from '../shared/contact-data.interface';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from './edit/edit.component';
import { ContactService } from '../shared/service/contact.service';
import { ConfirmDialogComponent } from '../shared/components/confirm-dialog/confirm-dialog.component';

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
  modalContact: IContactElement = {
  id: 0,
  name: '',
  email: '',
  dni: '',
  label: []
};

  constructor(public dialog: MatDialog,
    private _contactService: ContactService
  )
  {
    
  }

  ngOnInit() {
  this.dataSource.forEach(element => {
    this.modalContact.id = element.id;
    this.modalContact.name = element.name;
    this.modalContact.email = element.email;
    this.modalContact.dni = element.dni;
    this.modalContact.label = element.label;
    this._contactService.add(this.modalContact);
     
  });
 
}

  openContact(contact?: IContactElement) {
    const isEdit = !!contact;
    const dialogRef = this.dialog.open(EditComponent,{
      data: {
        contact: contact || null,
        title: isEdit ? 'Editar contacto': 'Crear contacto'
      }
    })

    dialogRef.beforeClosed().subscribe(result => {
        if(result){
          if(contact){
            this._contactService.update({...result, id: contact.id});
          }else{
            const newContact: IContactElement = {
              ...result,
              id: this.dataSource.length + 1
            }
            this._contactService.add(newContact);
          }
            this._contactService.contact$.subscribe(list => {
              this.dataSource = list;
            })
        }
    });

  }

onDelete(contact: IContactElement){
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  width: '400px',
  data: {
    title: 'Eliminar contacto',
    message: '¿Estás seguro(a) de eliminar este contacto?',
    okText: 'Sí, eliminar',
    cancelText: 'No'
  }
});

dialogRef.afterClosed().subscribe(confirmed => {
  if (confirmed) {
    this._contactService.delete(contact.id);
      this._contactService.contact$.subscribe(list => {
              this.dataSource = list;
            })
  }
});
}

  formatRut(rut: string): string {
    try {
      return formatRut(rut);
    } catch {
      return rut; 
    }
  }


}
