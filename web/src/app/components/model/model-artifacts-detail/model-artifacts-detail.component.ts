import { Component, Input } from '@angular/core';

import { ArtifactResponseModelArtifacts } from '../../../services/editor/types';

@Component({
  selector: 'app-model-artifacts-detail',
  templateUrl: './model-artifacts-detail.component.html',
  styleUrls: ['./model-artifacts-detail.component.css'],
})
export class ModelArtifactsDetailComponent {
  @Input() artifacts: ArtifactResponseModelArtifacts;
}
