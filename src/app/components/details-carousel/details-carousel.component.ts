import {Component, Input} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-details-carousel',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './details-carousel.component.html',
  styleUrl: './details-carousel.component.css',
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
export class DetailsCarouselComponent {
  @Input() mediaPaths: string[] = [];

  currentSlide = 0;

  constructor() {}

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.mediaPaths.length - 1 : previous;
    console.log("previous clicked, new current slide is: ", this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.mediaPaths.length ? 0 : next;
    console.log("next clicked, new current slide is: ", this.currentSlide);
  }
  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'https://metallps.ru/assets/cache_image/empty_720x540_e0a.png'; // Замещающее изображение
  }
}
