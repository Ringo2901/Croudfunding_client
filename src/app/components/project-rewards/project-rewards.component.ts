import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import {NgIf, NgForOf, DatePipe} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AuthService} from '../../services/auth-service.service';

@Component({
  selector: 'app-project-rewards',
  standalone: true,
  imports: [NgIf, NgForOf, FormsModule, DatePipe],
  templateUrl: './project-rewards.component.html',
  styleUrls: ['./project-rewards.component.css']
})
export class ProjectRewardsComponent implements OnInit {
  @Input() projectId!: number;
  isCreator: boolean = false;
  rewards: any[] = [];
  newReward = { title: '', description: '', amount: 0};
  nickname: string = '';
  constructor(private projectService: ProjectService, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchRewards();
    this.checkIfCreator();
  }

  checkIfCreator(): void {
    this.authService.status().subscribe(
      (response) => {
        this.nickname = response.user.nickname;
      })
    this.projectService.getProjectById(this.projectId).subscribe((project) => {
      this.isCreator = project.initiator.nickname === this.nickname;
    });
  }

  fetchRewards(): void {
    this.projectService.getProjectRewards(this.projectId).subscribe((rewards) => {
      this.rewards = rewards;
    });
  }

  addReward(): void {
    if (!this.newReward.title || this.newReward.amount <= 0) {
      alert('Пожалуйста, заполните все поля правильно.');
      return;
    }
    this.projectService.addProjectReward(this.projectId, this.newReward).subscribe(() => {
      this.newReward = { title: '', description: '', amount: 0};
      this.fetchRewards(); // Обновляем список вознаграждений
    });
  }
}
