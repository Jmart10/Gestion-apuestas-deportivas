import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Forecaster } from '../../../core/models/forecaster.model';
import { ForecastersService } from '../../../core/services/forecasters.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ForecasterFormModalComponent } from './componentes/forecaster-form-modal/forecaster-form-modal.component';

@Component({
  selector: 'app-admin-forecasters',
  templateUrl: './admin-forecasters.component.html',
  styleUrls: ['./admin-forecasters.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ForecasterFormModalComponent
  ]
})
export class AdminForecastersComponent implements OnInit {
  forecasters: Forecaster[] = [];
  filteredForecasters: Forecaster[] = [];
  filtersForm!: FormGroup;
  form!: FormGroup;
  selectedForecaster?: Forecaster;
  isEdit = false;
  showModal = false;

  constructor(private fb: FormBuilder, private service: ForecastersService) {}

  ngOnInit() {
    this.loadForecasters();
    this.initForm();
    this.initFiltersForm();
  }

  initFiltersForm() {
  this.filtersForm = this.fb.group({
    status: ['']
  });
}

  initForm() {
    this.form = this.fb.group({
      name: [''],
      telegramChannel: [''],
      sports: [[]],
      isPremium: [false],
      status: ['activo']
    });
  }

  loadForecasters() {
    this.service.getAll().subscribe(res => {
      this.forecasters = res;
      this.applyFilters();
    });
  }

  applyFilters() {
    const { status } = this.filtersForm.value;
    this.filteredForecasters = this.forecasters.filter(f => {
      return status ? f.status === status : true;
    });
  }


  handleSave(data: Forecaster) {
    if (this.isEdit && this.selectedForecaster?.id) {
      this.service.update(this.selectedForecaster.id, data).subscribe(() => {
        this.loadForecasters();
        this.cancel();
      });
    } else {
      this.service.create(data).subscribe(() => {
        this.loadForecasters();
        this.cancel();
      });
    }
  }

  toggleStatus(f: Forecaster) {
    this.service.toggleStatus(f.id!).subscribe(() => this.loadForecasters());
  }

  openCreateModal() {
  this.isEdit = false;
  this.selectedForecaster = undefined;
  this.form.reset({ isPremium: false, status: 'activo', sports: [] });
  this.showModal = true;
}

edit(f: Forecaster) {
  this.selectedForecaster = f;
  this.isEdit = true;
  this.form.patchValue(f);
  this.showModal = true;
}

cancel() {
  this.form.reset({ isPremium: false, status: 'activo', sports: [] });
  this.isEdit = false;
  this.selectedForecaster = undefined;
  this.showModal = false;
}
}
