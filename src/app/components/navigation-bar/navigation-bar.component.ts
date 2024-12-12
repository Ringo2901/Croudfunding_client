import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  isAuthenticated: boolean = false;
  userNickname: string = '';
  isDropdownVisible: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getAuthStatus().subscribe((status) => {
      this.isAuthenticated = status;
    });

    this.authService.isLoggedIn().subscribe(
      (data) => {
        this.isAuthenticated = data;
        if (this.isAuthenticated) {
          this.authService.status().subscribe(
            (response) => {
              this.userNickname = response.user.nickname;
            },
            (error) => {
              console.error('Ошибка при получении статуса пользователя:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Ошибка при загрузке состояния авторизации:', error);
      }
    );
  }

  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  navigateToAccount(): void {
    this.router.navigate(['/account']);
  }

  logout(): void {
    this.authService.logout().subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Ошибка при выходе:', error);
      }
    );
  }
  navigateToProjects(): void{
    this.router.navigate(['/projects']);
  }
  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
  navigateToCreateProject(): void {
    this.router.navigate(['/create-project']);
  }
}
