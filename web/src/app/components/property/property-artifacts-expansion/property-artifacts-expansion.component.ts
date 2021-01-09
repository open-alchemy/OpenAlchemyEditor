import { Component, Input } from '@angular/core';

import { ArtifactResponsePropertyAll } from '../../../services/editor/types';

@Component({
  selector: 'app-property-artifacts-expansion',
  templateUrl: './property-artifacts-expansion.component.html',
  styleUrls: ['./property-artifacts-expansion.component.css'],
})
export class PropertyArtifactsExpansionComponent {
  @Input() artifacts: ArtifactResponsePropertyAll;
}
