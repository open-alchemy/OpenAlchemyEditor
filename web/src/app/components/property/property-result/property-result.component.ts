import { Component, OnInit, Input } from '@angular/core';

import { ResultPropertyModel } from 'src/app/result.model';

@Component({
  selector: 'app-property-result',
  templateUrl: './property-result.component.html',
  styleUrls: ['./property-result.component.css'],
})
export class PropertyResultComponent implements OnInit {
  @Input() name = 'id';
  @Input() model: ResultPropertyModel;

  constructor() {}

  ngOnInit(): void {}
}
