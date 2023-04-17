import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSucursalesComponent } from './view-sucursales.component';

describe('ViewSucursalesComponent', () => {
  let component: ViewSucursalesComponent;
  let fixture: ComponentFixture<ViewSucursalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSucursalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
