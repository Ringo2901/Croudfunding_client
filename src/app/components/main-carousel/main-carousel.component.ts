import {Component, Input} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {animate, style, transition, trigger} from '@angular/animations';
import {ProjectService} from '../../services/project.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-carousel',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    DatePipe
  ],
  templateUrl: './main-carousel.component.html',
  styleUrl: './main-carousel.component.css',
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class MainCarouselComponent {

  currentSlide = 0;

  @Input() projects: any[] = [];

  constructor(private projectService: ProjectService, private router: Router) {}


  navigateToProject(projectId: number): void {
    this.router.navigate([`/project/${projectId}`]);
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.projects.length - 1 : previous;
    console.log("previous clicked, new current slide is: ", this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.projects.length ? 0 : next;
    console.log("next clicked, new current slide is: ", this.currentSlide);
  }

  get progress(): number {
    if (this.projects[this.currentSlide].analytics) {
      return (this.projects[this.currentSlide].analytics.total_founded / this.projects[this.currentSlide].goal) * 100;
    } else {
      return 0;
    }
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'https://metallps.ru/assets/cache_image/empty_720x540_e0a.png'; // Замещающее изображение
  }
}
