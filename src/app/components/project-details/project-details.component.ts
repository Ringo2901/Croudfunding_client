import {Component, Input} from '@angular/core';
import {Project} from '../../models/Project';
import {ProjectSliderComponent} from '../project-slider/project-slider.component';
import {DetailsCarouselComponent} from '../details-carousel/details-carousel.component';
import {DatePipe, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {ContributionService} from '../../services/contribution-service.service';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [
    ProjectSliderComponent,
    DetailsCarouselComponent,
    DatePipe,
    NgIf
  ],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent {
  @Input() project!: Project;
  isActive: boolean = false;
  mediaPaths: string[] = [];
  nickname: string = '';
  user_id: number = 0;
  contribution: any | null = null;

  constructor(private router: Router, private authService: AuthService, private contributionService: ContributionService) {}

  ngOnInit() {
    if (this.project?.media && Array.isArray(this.project.media)) {
      this.mediaPaths = this.project.media.map((media) => media.file_path);
    }
    this.authService.status().subscribe(
      (response) => {
        this.nickname = response.user.nickname;
        this.user_id = response.user.id;
        this.isActive = (new Date(this.project.end_date) > new Date()) && this.nickname!=this.project.initiator.nickname && !(this.nickname=="");
        this.contributionService.getContributionbyProductAndUser(this.user_id, this.project.id).subscribe((data) => {
          if (data.contributions && data.contributions.length > 0) {
            this.contribution = data.contributions[0];
          }
        });
      })

  }


  navigateToPayment() {
    this.router.navigate([`/payment/${this.project.id}`]);
  }

  get progress(): number {
    if (this.project.analytics) {
      return (this.project.analytics.total_founded / this.project.goal) * 100;
    } else {
      return 0;
    }
  }


  protected readonly Date = Date;
}
