import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPremioComponent } from './card-premio.component';

describe('CardPremioComponent', () => {
  let component: CardPremioComponent;
  let fixture: ComponentFixture<CardPremioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPremioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPremioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
