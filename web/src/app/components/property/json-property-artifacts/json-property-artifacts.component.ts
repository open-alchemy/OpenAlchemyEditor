import { Component, Input } from '@angular/core';

import { ArtifactResponsePropertiesJson } from '../../../services/editor/types';

@Component({
  selector: 'app-json-property-artifacts',
  templateUrl: './json-property-artifacts.component.html',
  styleUrls: ['./json-property-artifacts.component.css'],
})
export class JsonPropertyArtifactsComponent {
  @Input() artifacts: ArtifactResponsePropertiesJson;
}
