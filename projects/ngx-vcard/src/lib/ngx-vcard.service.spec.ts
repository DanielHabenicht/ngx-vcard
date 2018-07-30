import { TestBed, inject } from '@angular/core/testing';

import { NgxVcardService } from './ngx-vcard.service';

describe('NgxVcardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxVcardService]
    });
  });

  it('should be created', inject([NgxVcardService], (service: NgxVcardService) => {
    expect(service).toBeTruthy();
  }));
});
