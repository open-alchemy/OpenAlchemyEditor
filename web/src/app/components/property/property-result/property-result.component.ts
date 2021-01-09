import { Component, Input } from '@angular/core';

import { ResultPropertyModel } from '../../../services/editor/types';

@Component({
  selector: 'app-property-result',
  templateUrl: './property-result.component.html',
  styleUrls: ['./property-result.component.css'],
})
export class PropertyResultComponent {
  @Input() name = 'id';
  @Input() model: ResultPropertyModel;
}
