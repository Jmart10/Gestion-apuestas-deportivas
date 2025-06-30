import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user.model';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  @Input() user: User | null = null;
  @Input() isEditing = false;
  @Output() save = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();


  statusOptions = [
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' },
    { value: 'suspended', label: 'Suspendido' }
  ];

  userTypes = [
    {value: 'admin', label: 'Administrador'},
    {value: 'Normal', label: 'Normal'},
    {value: 'Premium', label: 'Premium'},
    {value: 'Super', label: 'Super Administrador'}
  ]

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      status: ['active', Validators.required],
      createdAt: [new Date(), Validators.required],
      lastPaymentDate: [null],
      lastPaymentAmount: [null],
      betsCreated: [0, [Validators.required, Validators.min(0)]],
      avatar: [''],
      password: ['']
    });
  }



  ngOnChanges() {
    if (this.user) {
      this.userForm.get('email')?.disable();
      this.userForm.patchValue({
        ...this.user,
        lastPaymentDate: this.user.lastPayment?.date || null,
        lastPaymentAmount: this.user.lastPayment?.amount || null,
        password: ''
      });

      // Al editar, quitamos validadores de la contraseña
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
    }else{
      // Al crear, la contraseña es obligatoria
      this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.userForm.get('password')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;

      const userData: User = {
        id: this.user?.id || this.generateId(),
        name: formValue.name!,
        email: formValue.email!,
        status: formValue.status as any,
        createdAt: formValue.createdAt!,
        betsCreated: formValue.betsCreated!,
        avatar: formValue.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        ...(formValue.lastPaymentDate && formValue.lastPaymentAmount ? {
          lastPayment: {
            date: formValue.lastPaymentDate,
            amount: formValue.lastPaymentAmount
          }
        } : {}),
        ...(formValue.password?.trim() ? { password: formValue.password } : {})
      };
      this.save.emit(userData);
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  onCancel() {
    this.cancel.emit();
  }
}