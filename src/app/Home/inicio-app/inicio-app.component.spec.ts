import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioAppComponent } from './inicio-app.component';

describe('InicioAppComponent', () => {
  let component: InicioAppComponent;
  let fixture: ComponentFixture<InicioAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
