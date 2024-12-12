import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {AuthService} from '../../services/auth-service.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    DatePipe
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent implements OnInit {
  currentSection: string = 'account';
  user: any = {};
  userProjects: any[] = [];
  userContributions: any[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAuthStatus();
    this.loadUserData();
  }

  checkAuthStatus() {
    this.authService.isLoggedIn().subscribe((isAuthenticated) => {
      if (!isAuthenticated) {
        this.router.navigate(['/login']);
      }
    });
  }

  loadUserContributions() {
    this.userService.getUserContributions(this.user.id).subscribe((contributions) => {
      this.userContributions = contributions;
    });
  }

  loadUserData() {
    this.userService.getUserInfo().subscribe((userData) => {
      this.user = userData;
    });

    this.userService.getUserProjects().subscribe((projects) => {
      this.userProjects = projects;
    });
  }

  selectSection(section: string) {
    this.currentSection = section;
    if (section === 'activity') {
      this.loadUserContributions();
    }
  }

  updateAccount() {
    this.userService.updateUserInfo(this.user).subscribe((updatedUser) => {
      this.user = updatedUser;
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  navigateToProject(projectId: number): void {
    this.router.navigate([`/project/${projectId}`]);
  }
}
