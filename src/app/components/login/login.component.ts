import { Component } from '@angular/core';
import {AuthService} from '../../services/auth-service.service';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe(
      () => {
        alert('Авторизация успешна!');
        this.router.navigate(['/']);
      },
      (error) => {
        alert('Ошибка авторизации: ' + error.error.message);
      }
    );
  }
}
