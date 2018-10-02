import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ExtCommsService } from './ext-comms.service';

describe('ExtCommsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExtCommsService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject(
    [ExtCommsService],
    (service: ExtCommsService) => {
      expect(service).toBeTruthy();
    }
  ));
});
