import { Component, OnInit } from '@angular/core';
import { ExtCommsService } from './shared/services/ext-comms.service';
import { IntermediateService } from './shared/services/intermediate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ObservablesUnitTests1';
  result = '';

  constructor(private int: IntermediateService) {}

  ngOnInit() {
    this.int.checkDummyData('').subscribe(res => {
      this.result = JSON.stringify(res, null, 2);
    });
  }
}
