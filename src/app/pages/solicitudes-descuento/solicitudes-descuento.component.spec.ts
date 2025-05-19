import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudesDescuentoComponent } from './solicitudes-descuento.component';

describe('SolicitudesDescuentoComponent', () => {
  let component: SolicitudesDescuentoComponent;
  let fixture: ComponentFixture<SolicitudesDescuentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudesDescuentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesDescuentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
