import { TestBed } from '@angular/core/testing';

import { Makeup } from './makeup';

describe('Makeup', () => {
  let service: Makeup;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Makeup);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
