import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-upload-images',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './upload-images.component.html',
  styleUrl: './upload-images.component.css'
})
export class UploadImagesComponent {
  selectedFiles: File[] = [];
  previews: string[] = [];
  hasUploadedImages = false;
  projectId: string | null;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router
  ) {
    this.projectId = this.route.snapshot.paramMap.get('id');
  }

  onFileSelected(event: any) {
    const files = Array.from(event.target.files) as File[];
    this.selectedFiles.push(...files);

    // Generate image previews
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: any) => this.previews.push(e.target.result);
      reader.readAsDataURL(file);
    });
  }

  uploadImage(file: File) {
    if (this.projectId) {
      this.projectService.uploadImages(this.projectId, file).subscribe(
        (response) => {
          console.log('Изображение загружено:', response);
          this.hasUploadedImages = true;
        },
        (error) => {
          console.error('Ошибка при загрузке изображения:', error);
        }
      );
    }
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
    this.previews.splice(index, 1);
  }

  uploadAllImages() {
    if (this.projectId && this.selectedFiles.length > 0) {
      this.selectedFiles.forEach((file) => this.uploadImage(file));
    }
  }

  completeProject() {
    this.uploadAllImages()
    if (this.projectId && this.hasUploadedImages) {
      this.router.navigate(['/project', this.projectId]);
    }
  }
}
