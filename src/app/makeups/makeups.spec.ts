import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Makeups } from './makeups';

describe('Makeups', () => {
  let component: Makeups;
  let fixture: ComponentFixture<Makeups>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Makeups]
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
