import { Component, Inject, Input } from '@angular/core';
import { IContactElement } from '../../shared/contact-data.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})


export class EditComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IContactElement,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      name: [data.name, Validators.required],
      dni: [data.dni, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void{
    if (!this.form.invalid) {
      this.dialogRef.close({...this.data, ...this.form.value})
    }else{
    this.form.markAllAsTouched();
    }
     
    
  }
  
  
}
