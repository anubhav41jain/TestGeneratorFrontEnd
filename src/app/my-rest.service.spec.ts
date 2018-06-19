import { TestBed, inject } from '@angular/core/testing';

import { MyRestService } from './my-rest.service';

describe('MyRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyRestService]
    });
  });

  it('should be created', inject([MyRestService], (service: MyRestService) => {
    expect(service).toBeTruthy();
  }));
});
