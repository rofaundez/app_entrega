import { ComponentFixture, TestBed } from '@angular/core/testing';
import { inicioPage } from './inicio.page';

describe('InicioPage', () => {
  let component: inicioPage;
  let fixture: ComponentFixture<inicioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(inicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
