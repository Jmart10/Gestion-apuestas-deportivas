import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Forecaster } from '../../../../../core/models/forecaster.model';

@Component({
  selector: 'app-forecaster-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forecaster-form-modal.component.html',
  styleUrls: ['./forecaster-form-modal.component.css']
})
export class ForecasterFormModalComponent {
  @Input() visible = false;
  @Input() isEdit = false;
  @Input() forecaster?: Forecaster;

  @Output() save = new EventEmitter<Forecaster>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      telegramChannel: [''],
      sport: ['', Validators.required],
      isPremium: [false],
      status: ['activo']
    });
  }

  ngOnChanges() {
    if (this.visible && this.forecaster) {
      this.form.patchValue(this.forecaster);
    } else {
      this.form.reset({ isPremium: false, status: 'activo', sports: [] });
    }
  }

  onSubmit() {
    this.save.emit(this.form.value);
  }

  onCancel() {
    this.cancel.emit();
  }
}
