import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleCardsComponent } from './simple-cards.component';

describe('SimpleCardsComponent', () => {
  let component: SimpleCardsComponent;
  let fixture: ComponentFixture<SimpleCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
