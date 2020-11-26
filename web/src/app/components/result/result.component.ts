import { Component, OnInit, Input } from '@angular/core';

import { ValidatorResultModel } from 'src/app/validator.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  @Input() model: ValidatorResultModel;
  @Input() symbol = 'error';

  constructor() {}

  ngOnInit(): void {}
}
