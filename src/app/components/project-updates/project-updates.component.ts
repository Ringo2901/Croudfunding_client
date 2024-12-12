import {assertNotInReactiveContext, Component, Input, OnInit} from '@angular/core';
import { ProjectService } from '../../services/project.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AuthService} from '../../services/auth-service.service';

@Component({
  selector: 'app-project-updates',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    DatePipe
  ],
  template: `
    <div class="updates-container">
      <h2>Обновления проекта</h2>

      <div *ngIf="isCreator" class="new-update">
        <h3>Добавить новое обновление</h3>
        <input type="text" [(ngModel)]="newUpdateTitle" placeholder="Заголовок" />
        <textarea [(ngModel)]="newUpdateContent" placeholder="Содержание обновления"></textarea>
        <button (click)="addUpdate()" [disabled]="!canAddUpdate()">Добавить</button>
      </div>

      <div class="updates-list">
        <div *ngFor="let update of updates" class="update-item">
          <h3 class="update-title">{{ update.title }}</h3>
          <p class="update-content">{{ update.content }}</p>
          <span class="update-date">{{ update.created_at | date: 'medium' }}</span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./project-updates.component.css']
})
export class ProjectUpdatesComponent implements OnInit {
  @Input() projectId!: number;
  updates: any[] = [];
  newUpdateTitle: string = '';
  newUpdateContent: string = '';
  isCreator: boolean = false;
  nickname: string = '';
  constructor(
    private projectService: ProjectService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUpdates();
    this.checkIfCreator();
  }

  loadUpdates(): void {
    this.projectService.getProjectUpdates(this.projectId).subscribe((updates) => {
      this.updates = updates;
    });
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

  addUpdate(): void {
    const newUpdate = {
      title: this.newUpdateTitle.trim(),
      content: this.newUpdateContent.trim(),
      created_at: new Date(),
    };
    this.projectService.addProjectUpdate(this.projectId, newUpdate).subscribe(() => {
      this.updates.unshift(newUpdate);
      this.newUpdateTitle = '';
      this.newUpdateContent = '';
    });
  }

  canAddUpdate(): boolean {
    return this.newUpdateTitle.trim() !== '' && this.newUpdateContent.trim() !== '';
  }
}
