import { Component } from '@angular/core';
import {NavigationBarComponent} from '../navigation-bar/navigation-bar.component';
import {ProjectSliderComponent} from '../project-slider/project-slider.component';
import {Project} from '../../models/Project';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {ProjectService} from '../../services/project.service';
import {MainCarouselComponent} from '../main-carousel/main-carousel.component';
import {PlatformHistoryComponent} from '../platform-history/platform-history.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NavigationBarComponent,
    ProjectSliderComponent,
    MainCarouselComponent,
    PlatformHistoryComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  popularProjects: Project[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.loadPopularProjects();
  }

  loadPopularProjects() {
    this.projectService.getTopProjects().subscribe({
      next: (projects) => {
        this.popularProjects = projects;
      },
      error: (error) => {
        console.error('Ошибка при загрузке популярных проектов:', error);
      },
    });
  }

  onCreateProjectClick() {
    const isAuthenticated = this.authService.isLoggedIn();
    if (isAuthenticated) {
      this.router.navigate(['/create-project']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
