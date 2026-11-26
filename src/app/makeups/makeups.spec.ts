import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { Makeups } from './makeups';

describe('Makeups', () => {
  let component: Makeups;
  let fixture: ComponentFixture<Makeups>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Makeups],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Makeups);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
