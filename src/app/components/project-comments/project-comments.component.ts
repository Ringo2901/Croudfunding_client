import {Component, Input, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {AuthService} from '../../services/auth-service.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-project-comments',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  template: `
    <div class="updates-container">
      <h2>Комментарии к проекту</h2>

      <div *ngIf="isCreator && nickname!=''" class="new-update">
        <h3>Добавить новый комментарий</h3>
        <textarea [(ngModel)]="newUpdateContent" placeholder="Комменатрий"></textarea>
        <button (click)="addUpdate()" [disabled]="!canAddUpdate()">Добавить</button>
      </div>

      <div class="updates-list">
        <div *ngFor="let comment of comments" class="update-item">
          <p class="update-content">{{ comment.content }}</p>
          <span class="update-date">{{ comment.user?.nickname }}</span>
          <span class="update-date">{{ comment.created_at | date: 'medium' }}</span>
        </div>
      </div>
    </div>
  `,
  styleUrl: './project-comments.component.css'
})
export class ProjectCommentsComponent implements OnInit {
  @Input() projectId!: number;
  comments: any[] = [];
  user_id: number = 0;
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
    this.projectService.getProjectComments(this.projectId).subscribe((comments) => {
      this.comments = comments;
    });
    console.log(this.nickname)
  }

  checkIfCreator(): void {
    this.authService.status().subscribe(
      (response) => {
        this.nickname = response.user.nickname;
        this.user_id = response.user.id;
      })
    this.projectService.getProjectById(this.projectId).subscribe((project) => {
      this.isCreator = !(project.initiator.nickname === this.nickname);
    });
  }

  addUpdate(): void {
    const newUpdate = {
      content: this.newUpdateContent.trim(),
      user_id: this.user_id
    };
    this.projectService.addProjectComment(this.projectId, newUpdate).subscribe(() => {
      this.comments.unshift(newUpdate);
      this.newUpdateContent = '';
    });
  }

  canAddUpdate(): boolean {
    return this.newUpdateContent.trim() !== '';
  }
}
