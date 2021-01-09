import { Component, Input } from '@angular/core';

import { ArtifactResponseModelCompositeUnique } from '../../../../services/editor/types';

@Component({
  selector: 'app-composite-unique',
  templateUrl: './composite-unique.component.html',
  styleUrls: ['./composite-unique.component.css'],
})
export class CompositeUniqueComponent {
  @Input() composite_unique: ArtifactResponseModelCompositeUnique;
}
