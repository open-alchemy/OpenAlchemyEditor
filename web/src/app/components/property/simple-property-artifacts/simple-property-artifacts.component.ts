import { Component, Input } from '@angular/core';

import { ArtifactResponsePropertiesSimple } from '../../../services/editor/types';

@Component({
  selector: 'app-simple-property-artifacts',
  templateUrl: './simple-property-artifacts.component.html',
  styleUrls: ['./simple-property-artifacts.component.css'],
})
export class SimplePropertyArtifactsComponent {
  @Input() artifacts: ArtifactResponsePropertiesSimple;
}
