import {Component, Input} from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-tile',
  standalone: true,
  imports: [],
  templateUrl: './project-tile.component.html',
  styleUrl: './project-tile.component.css'
})
export class ProjectTileComponent {
  @Input() project: any;

  constructor(private router: Router) {}

  navigateToProject(projectId: number): void {
    this.router.navigate([`/project/${projectId}`]);
  }
}
