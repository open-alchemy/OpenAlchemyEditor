import { Component, Input } from '@angular/core';

import { ArtifactResponseModelArtifacts } from '../../../services/editor/types';

@Component({
  selector: 'app-model-artifacts-title',
  templateUrl: './model-artifacts-title.component.html',
  styleUrls: ['./model-artifacts-title.component.css'],
})
export class ModelArtifactsTitleComponent {
  @Input() artifacts: ArtifactResponseModelArtifacts;

  constructor() {}
}
