import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProfilesComponent } from './app-profiles.component';

describe('AppProfilesComponent', () => {
  let component: AppProfilesComponent;
  let fixture: ComponentFixture<AppProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppProfilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
