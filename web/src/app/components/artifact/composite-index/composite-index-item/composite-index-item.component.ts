import { Component, Input } from '@angular/core';

import { ArtifactResponseModelIndex } from '../../../../services/editor/types';

@Component({
  selector: 'app-composite-index-item',
  templateUrl: './composite-index-item.component.html',
  styleUrls: ['./composite-index-item.component.css'],
})
export class CompositeIndexItemComponent {
  @Input() item: ArtifactResponseModelIndex;
}
