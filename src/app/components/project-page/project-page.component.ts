import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {ActivatedRoute} from '@angular/router';
import {Project} from '../../models/Project';
import {ProjectTabsComponent} from '../project-tabs/project-tabs.component';
import {ProjectDetailsComponent} from '../project-details/project-details.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [
    ProjectTabsComponent,
    ProjectDetailsComponent,
    NgIf
  ],
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.css'
})
export class ProjectPageComponent implements OnInit {
  project: Project | null = null;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    const projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService.getProjectById(projectId).subscribe((project) => {
      this.project = project;
    });
  }
}
