import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyActivityComponent } from './daily-activity.component';

describe('DailyActivityComponent', () => {
  let component: DailyActivityComponent;
  let fixture: ComponentFixture<DailyActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyActivityComponent]
    });
    fixture = TestBed.createComponent(DailyActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
