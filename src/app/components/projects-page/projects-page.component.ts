import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {ProjectTileComponent} from '../project-tile/project-tile.component';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ProjectService} from '../../services/project.service';
import {Category} from '../../models/Category';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [
    NgForOf,
    ProjectTileComponent,
    FormsModule
  ],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css'
})
export class ProjectsPageComponent {
  projects: any[] = [];
  categories: any[] = [];
  types: string[] = ['Все или ничего', 'Открытое финансирование'];
  searchQuery: string = '';
  selectedCategory: string = '';
  selectedType: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 9;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.fetchProjects();
  }

  // Получение списка категорий
  loadCategories(): void {
    this.projectService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  // Запрос проектов с фильтрацией и пагинацией
  fetchProjects(): void {
    const filters = {
      search: this.searchQuery,
      category: this.selectedCategory,
      type: this.selectedType,
    };
    this.projectService
      .getProjects(this.currentPage, this.pageSize, this.searchQuery, this.selectedCategory, this.selectedType)
      .subscribe((response) => {
        this.projects = response.data;
        this.totalPages = response.totalPages;
      });
  }

  // Применение фильтров
  applyFilters(): void {
    this.currentPage = 1; // Сбрасываем на первую страницу
    this.fetchProjects();
  }

  // Изменение страницы
  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchProjects();
    }
  }
}
