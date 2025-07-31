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
    const current = this.loadContacts();
    const exists = current.some(c => c.id === contact.id);
    if(!exists){
       const list = [...current, contact];
      this.saveContacts(list);
    }
  }

  update(update: IContactElement){
    const list = this.loadContacts().map(c => c.id === update.id ? update : c);
    this.saveContacts(list);
  }

  delete(id: number): void{
    const current = this.loadContacts();
    const update = current.filter(c => c.id !== id);
    this.saveContacts(update);
    this.contactsSubject.next(update);
  }
}
