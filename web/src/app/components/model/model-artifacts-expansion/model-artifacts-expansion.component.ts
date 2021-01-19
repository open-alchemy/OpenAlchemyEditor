import { Component, Input } from '@angular/core';

import { ArtifactResponseModelArtifacts } from '../../../services/editor/types';

@Component({
  selector: 'app-model-artifacts-expansion',
  templateUrl: './model-artifacts-expansion.component.html',
  styleUrls: ['./model-artifacts-expansion.component.css'],
})
export class ModelArtifactsExpansionComponent {
  @Input() artifacts: ArtifactResponseModelArtifacts;

  constructor() {}
}
