import { Component, OnInit, Input } from '@angular/core';

import { ResultModelModel } from 'src/app/result.model';

@Component({
  selector: 'app-model-result',
  templateUrl: './model-result.component.html',
  styleUrls: ['./model-result.component.css'],
})
export class ModelResultComponent implements OnInit {
  @Input() name: string;
  @Input() model: ResultModelModel;

  constructor() {}

  ngOnInit(): void {}
}
