import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosViewComponent } from './usuarios-view.component';

describe('UsuariosViewComponent', () => {
  let component: UsuariosViewComponent;
  let fixture: ComponentFixture<UsuariosViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
