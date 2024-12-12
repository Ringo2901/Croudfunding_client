import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRewardsComponent } from './project-rewards.component';

describe('ProjectRewardsComponent', () => {
  let component: ProjectRewardsComponent;
  let fixture: ComponentFixture<ProjectRewardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectRewardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
