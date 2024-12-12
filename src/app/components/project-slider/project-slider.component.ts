import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {ProjectService} from '../../services/project.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-slider',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './project-slider.component.html',
  styleUrl: './project-slider.component.css'
})
export class ProjectSliderComponent {
  @Input() projects: any[] = [];

  constructor(private projectService: ProjectService, private router: Router) {}


  navigateToProject(projectId: number): void {
    this.router.navigate([`/project/${projectId}`]);
  }
}
