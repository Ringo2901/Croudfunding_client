import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCarouselComponent } from './details-carousel.component';

describe('DetailsCarouselComponent', () => {
  let component: DetailsCarouselComponent;
  let fixture: ComponentFixture<DetailsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
