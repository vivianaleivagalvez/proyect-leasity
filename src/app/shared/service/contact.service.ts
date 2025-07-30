import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IContactElement } from '../contact-data.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
private readonly STORAGE_KEY = 'contacts';
private contactsSubject = new BehaviorSubject<IContactElement[]>([]);
contact$ = this.contactsSubject.asObservable();


  private loadContacts(): IContactElement[]{
    const json = localStorage.getItem(this.STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  }

  private saveContacts(list: IContactElement[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
    this.contactsSubject.next(list);
  }

   add(contact: IContactElement) {
    const list = [...this.loadContacts(), contact];
    this.saveContacts(list);
  }

  update(update: IContactElement){
    debugger;
    const list = this.loadContacts().map(c => c.id === update.id ? update : c);
    this.saveContacts(list)
  }
}
