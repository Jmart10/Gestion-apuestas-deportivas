import { Component } from '@angular/core';
import { User } from './models/user.model';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';


@Component({
  selector: 'app-usuarios',
  imports: [
    CommonModule,
    UserListComponent,
    UserFormComponent,
    //UserDetailComponent
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  users: User[] = [
    {
      id: '1',
      name: 'María González',
      email: 'maria@example.com',
      status: 'active',
      createdAt: new Date('2023-01-15'),
      lastPayment: {
        date: new Date('2023-06-01'),
        amount: 50
      },
      betsCreated: 12,
      avatar: 'https://i.pravatar.cc/150?img=1'
    }
  ];
  
  selectedUser: User | null = null;
  showUserForm = false;
  isEditing = false;

  selectUser(user: User) {
    this.selectedUser = user;
  }

  createUser() {
    this.selectedUser = null;
    this.isEditing = false;
    this.showUserForm = true;
  }

  editUser(user: User) {
    this.selectedUser = { ...user };
    this.isEditing = true;
    this.showUserForm = true;
  }

  saveUser(user: User) {
    if (this.isEditing) {
      // Lógica para actualizar
    } else {
      // Lógica para crear
    }
    this.showUserForm = false;
  }

  deleteUser(id: string) {
    // Lógica para eliminar
  }
}
