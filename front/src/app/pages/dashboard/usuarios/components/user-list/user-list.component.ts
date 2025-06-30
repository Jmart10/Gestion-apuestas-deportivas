import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
// Importaciones de Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
    imports: [
    CommonModule,
    // Módulos de Angular Material
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
})
export class UserListComponent {
  @Input() users: User[] = [];
  @Output() select = new EventEmitter<User>();
  @Output() edit = new EventEmitter<User>();
  @Output() delete = new EventEmitter<string>();

  displayedColumns: string[] = ['avatar', 'name', 'status', 'createdAt', 'lastPayment', 'betsCreated', 'actions'];
  filteredUsers = new MatTableDataSource<User>([]);
    selectedUserId: string | null = null; 

  ngOnChanges() {
    // Se actualiza el dataSource cuando cambian los usuarios
    this.filteredUsers = new MatTableDataSource(this.users);
  }

  // Método para filtrar por texto
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredUsers.filter = filterValue;
  }


}