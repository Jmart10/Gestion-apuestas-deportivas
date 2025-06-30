import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserService } from '../../../core/services/user.service';


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
  users: User[] = [];
  
  selectedUser: User | null = null;
  showUserForm = false;
  isEditing = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users.map(u => ({
        ...u,
        id: u.id || (u as any)._id
      }));
    });
  }

  createUser(){
    this.selectedUser = null;
    this.isEditing = false;
    this.showUserForm = true;
  }

  editUser(user: User){
    this.selectedUser = { ...user};
    this.isEditing = true;
    this.showUserForm = true;
  }

  saveUser(user: User){
    if(this.isEditing){
      this.userService.updateUser(user.id, user).subscribe(() => this.loadUsers());
    }else {
      this.userService.createUser(user).subscribe(() => this.loadUsers());
    }
    this.showUserForm = false;
  }

  deleteUser(id: string){
    this.userService.deleteUser(id).subscribe(() => this.loadUsers());
  }
}
