import { Component, Input } from '@angular/core';

import { ArtifactResponseModelArtifacts } from '../../../services/editor/types';

@Component({
  selector: 'app-model-artifacts',
  templateUrl: './model-artifacts.component.html',
  styleUrls: ['./model-artifacts.component.css'],
})
export class ModelArtifactsComponent {
  @Input() artifacts: ArtifactResponseModelArtifacts;
}
