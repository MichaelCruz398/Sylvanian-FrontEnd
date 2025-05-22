import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmadoComponent } from './confirmado.component';

describe('ConfirmadoComponent', () => {
  let component: ConfirmadoComponent;
  let fixture: ComponentFixture<ConfirmadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
