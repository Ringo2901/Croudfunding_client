import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { Category } from '../../models/Category';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-create-project-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
  ],
  templateUrl: './create-project-page.component.html',
  styleUrl: './create-project-page.component.css',
})
export class CreateProjectPageComponent {
  projectForm: FormGroup;
  @Input() categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      goal: [null, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      fundingType: ['', Validators.required],
    }, { validators: this.dateValidator });

    this.projectService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Ошибка при загрузке категорий:', error);
      }
    );
  }

  /**
   * Кастомный валидатор для проверки дат.
   */
  private dateValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = new Date(control.get('startDate')?.value);
    const endDate = new Date(control.get('endDate')?.value);
    const currentDate = new Date();

    if (!startDate || !endDate) {
      return null; // Если даты отсутствуют, валидатор ничего не проверяет.
    }

    // Проверяем, что обе даты не раньше текущей.
    if (startDate < currentDate || endDate < currentDate) {
      return { dateInPast: true };
    }

    // Проверяем, что дата окончания позже даты начала.
    if (endDate <= startDate) {
      return { endDateBeforeStartDate: true };
    }

    // Проверяем, что разница между датами не больше месяца.
    const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000;
    if (endDate.getTime() - startDate.getTime() > oneMonthInMilliseconds) {
      return { dateDifferenceTooLarge: true };
    }

    return null;
  }

  createProject() {
    if (this.projectForm.valid) {
      const projectData = {
        ...this.projectForm.value,
        categoryId: this.projectForm.value.category,
      };
      delete projectData.category;

      this.projectService.createProject(projectData).subscribe(
        (response) => {
          const projectId = response.project.id;
          this.router.navigate(['/upload-images', projectId]);
        },
        (error) => {
          console.error('Ошибка при создании проекта:', error);
        }
      );
    }
  }
}
