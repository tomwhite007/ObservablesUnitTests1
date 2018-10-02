import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { IntermediateService } from './intermediate.service';
import { ExtCommsService } from './ext-comms.service';
import { of } from 'rxjs';

describe('IntermediateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntermediateService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject(
    [IntermediateService],
    (service: IntermediateService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should request correct report', inject(
    [IntermediateService, ExtCommsService],
    (service: IntermediateService, comms: ExtCommsService) => {
      const getDummyData = spyOn(comms, 'getDummyData');
      getDummyData.and.returnValue(
        of({
          msg: 'overriden result from ExtCommsService'
        })
      );

      service.checkDummyData('test').subscribe(res => {
        expect(res).toEqual(true);
        expect(getDummyData.calls.first().args).toEqual(['test2']);
      });
    }
  ));

  it('expects service to fetch and translate mocked api data', inject(
    [HttpTestingController, IntermediateService, ExtCommsService],
    (
      httpMock: HttpTestingController,
      service: IntermediateService,
      comms: ExtCommsService
    ) => {
      // We call the service
      service.checkDummyData('test').subscribe(value => {
        expect(value).toEqual(true);
      });
      // We set the expectations for the HttpClient mock
      const extras = '';
      const req = httpMock.expectOne(r => {
        console.log('request object:', r);
        if (r.url === 'assets/api/dummyResult.json') {
          console.log('url found');
          return true;
        }
      });
      expect(req.request.method).toEqual('GET');
      // Then we set the fake data to be returned by the mock
      req.flush({
        msg: 'overriden result from ExtCommsService'
      });

      // make sure all mocks have been triggered
      httpMock.verify();
    }
  ));
});
