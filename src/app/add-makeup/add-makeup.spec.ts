import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { AddMakeup } from './add-makeup';

describe('AddMakeup', () => {
  let component: AddMakeup;
  let fixture: ComponentFixture<AddMakeup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMakeup],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMakeup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
