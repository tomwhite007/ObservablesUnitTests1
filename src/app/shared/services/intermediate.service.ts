import { Injectable } from '@angular/core';
import { ExtCommsService } from './ext-comms.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IntermediateService {
  constructor(private comms: ExtCommsService) {}

  checkDummyData(testArg: string) {
    return this.comms
      .getDummyData(testArg + '2')
      .pipe(map(res => (res.msg ? true : false)));
  }

  getDelayedDummyData() {
    return this.comms.getDelayedDummyData();
  }
}
