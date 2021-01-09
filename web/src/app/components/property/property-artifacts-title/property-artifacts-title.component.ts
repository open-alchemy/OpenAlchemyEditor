import { Component, Input } from '@angular/core';

import { ArtifactResponsePropertyAll } from '../../../services/editor/types';

@Component({
  selector: 'app-property-artifacts-title',
  templateUrl: './property-artifacts-title.component.html',
  styleUrls: ['./property-artifacts-title.component.css'],
})
export class PropertyArtifactsTitleComponent {
  @Input() artifacts: ArtifactResponsePropertyAll;
}
