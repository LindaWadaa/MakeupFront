import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMakeup } from './add-makeup';

describe('AddMakeup', () => {
  let component: AddMakeup;
  let fixture: ComponentFixture<AddMakeup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMakeup]
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
