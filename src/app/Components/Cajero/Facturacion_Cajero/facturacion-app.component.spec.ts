import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturacionAppComponent } from './facturacion-app.component';

describe('FacturacionAppComponent', () => {
  let component: FacturacionAppComponent;
  let fixture: ComponentFixture<FacturacionAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturacionAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturacionAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
