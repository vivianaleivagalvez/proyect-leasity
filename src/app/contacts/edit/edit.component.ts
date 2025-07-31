import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { formatRut, isRutValid } from '@ftapiat/js-rut-utils';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})


export class EditComponent {
  form: FormGroup;
  labelList: string[] = ['FrontEnd', 'BackEnd', 'Diseño', 'DevOps'];
  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      name: [data?.contact?.name, Validators.required],
      dni: [data?.contact?.dni, [Validators.required, this.validarRut]],
      email: [data?.contact?.email, [Validators.required, Validators.email]],
      label: [data?.contact?.label],
    });
  }


    ngOnInit() {
      console.log(this.data)
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void{
    if (!this.form.invalid) {
      this.dialogRef.close({...this.form.value})
    }else{
    this.form.markAllAsTouched();
    }
     
    
  }


  onInputRut(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    const clean = input.replace(/[^0-9kK]/g, '');
    try {
      const formatted = formatRut(clean);
      this.form.controls['dni'].patchValue(formatted, { emitEvent: false });
    } catch {
      
    }
  }



 validarRut(control: AbstractControl): ValidationErrors | null {
  const rut = (control.value || '').replace(/\./g, '').replace(/-/g, '').toUpperCase();
  if (!/^\d+k?$/i.test(rut)) return { invalidRut: true };

  const num = rut.slice(0, -1);
  const dv = rut.slice(-1);
  let suma = 0, factor = 2;
  for (let i = num.length - 1; i >= 0; i--) {
    suma += +num[i] * factor;
    factor = factor < 7 ? factor + 1 : 2;
  }
  const resto = suma % 11;
  const dvEsperado =
    (11 - resto === 11 ? '0' : (11 - resto === 10 ? 'K' : (11 - resto).toString()));
  return dvEsperado === dv ? null : { invalidRut: true };
}

}

