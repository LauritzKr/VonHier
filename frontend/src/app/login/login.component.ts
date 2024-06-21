import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private userService: UserService = inject(UserService);

  protected loginForm: FormGroup;
  protected registerForm: FormGroup;
  protected showLoginForm: boolean = true;

  constructor() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.registerForm = this.formBuilder.group({
      id: [uuidv4()],
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telNr: ['', Validators.required],
      street: [''],
      housenr: [''],
      postalcode: [''],
      city: [''],
    });
  }

  protected toggleForm(): void {
    this.showLoginForm = !this.showLoginForm;
  }

  protected onLogin(): void {
    if (
      this.loginForm.valid &&
      this.loginForm.value.username === 'testuser' &&
      this.loginForm.value.password === 'test'
    ) {
      this.router.navigate(['/offers']);
    }
  }

  protected onRegister(): void {
    if (this.registerForm.valid) {
      const newUser: User = this.registerForm.value;
      const password: string = this.registerForm.value.password;
      this.userService.registerUser(newUser, password).subscribe();
    }
  }
}
