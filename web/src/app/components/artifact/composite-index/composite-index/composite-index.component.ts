import { Component, Input } from '@angular/core';

import { ArtifactResponseModelCompositeIndex } from '../../../../services/editor/types';

@Component({
  selector: 'app-composite-index',
  templateUrl: './composite-index.component.html',
  styleUrls: ['./composite-index.component.css'],
})
export class CompositeIndexComponent {
  @Input() composite_index: ArtifactResponseModelCompositeIndex;
}
