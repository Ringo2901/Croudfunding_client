import {Component, Input, OnInit} from '@angular/core';
import {ProjectUpdatesComponent} from '../project-updates/project-updates.component';
import {ProjectCommentsComponent} from '../project-comments/project-comments.component';
import {ProjectRewardsComponent} from '../project-rewards/project-rewards.component';
import {NgIf} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../services/project.service';
import {AuthService} from '../../services/auth-service.service';
import {ProjectAnalyticsComponent} from '../project-analytics/project-analytics.component';

@Component({
  selector: 'app-project-tabs',
  standalone: true,
  imports: [
    ProjectUpdatesComponent,
    ProjectCommentsComponent,
    ProjectRewardsComponent,
    NgIf,
    ProjectAnalyticsComponent
  ],
  templateUrl: './project-tabs.component.html',
  styleUrl: './project-tabs.component.css'
})
export class ProjectTabsComponent implements OnInit {
  @Input() projectId!: number;
  @Input() initiator_nickname!: string;
  activeTab: 'updates' | 'comments' | 'rewards' | 'analytics' = 'updates';
  isInitiator: boolean = false;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.status().subscribe(
      (response) => {
        this.isInitiator = response.user.nickname == this.initiator_nickname;
      },
      (error) => {
        console.error('Ошибка при получении статуса пользователя:', error);
      }
    );
  }
}
