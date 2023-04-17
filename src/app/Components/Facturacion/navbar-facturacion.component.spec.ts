import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarFacturacionComponent } from './navbar-facturacion.component';

describe('NavbarFacturacionComponent', () => {
  let component: NavbarFacturacionComponent;
  let fixture: ComponentFixture<NavbarFacturacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarFacturacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
