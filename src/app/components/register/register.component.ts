import { Component } from '@angular/core';
import {AuthService} from '../../services/auth-service.service';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  nickname: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    this.authService.register(this.nickname, this.email, this.password).subscribe(
      () => {
        alert('Регистрация успешна!');
        this.router.navigate(['/login']);
      },
      (error) => {
        alert('Ошибка регистрации: ' + error.error.message);
      }
    );
  }
}
