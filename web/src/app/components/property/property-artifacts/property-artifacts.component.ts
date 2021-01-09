import { Component, Input } from '@angular/core';

import { ArtifactResponsePropertyAll } from '../../../services/editor/types';

@Component({
  selector: 'app-property-artifacts',
  templateUrl: './property-artifacts.component.html',
  styleUrls: ['./property-artifacts.component.css'],
})
export class PropertyArtifactsComponent {
  @Input() artifacts: ArtifactResponsePropertyAll;
}
