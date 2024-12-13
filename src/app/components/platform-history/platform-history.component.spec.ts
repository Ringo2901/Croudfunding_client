import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformHistoryComponent } from './platform-history.component';

describe('PlatformHistoryComponent', () => {
  let component: PlatformHistoryComponent;
  let fixture: ComponentFixture<PlatformHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatformHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatformHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
