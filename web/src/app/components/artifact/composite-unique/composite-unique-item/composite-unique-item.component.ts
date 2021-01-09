import { Component, Input } from '@angular/core';

import { ArtifactResponseModelUnique } from '../../../../services/editor/types';

@Component({
  selector: 'app-composite-unique-item',
  templateUrl: './composite-unique-item.component.html',
  styleUrls: ['./composite-unique-item.component.css'],
})
export class CompositeUniqueItemComponent {
  @Input() item: ArtifactResponseModelUnique;
}
