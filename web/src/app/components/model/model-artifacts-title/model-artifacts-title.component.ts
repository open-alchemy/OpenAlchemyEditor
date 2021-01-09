import { Component, OnInit, Input } from '@angular/core';

import { ArtifactResponseModelArtifacts } from '../../../services/editor/types';

@Component({
  selector: 'app-model-artifacts-title',
  templateUrl: './model-artifacts-title.component.html',
  styleUrls: ['./model-artifacts-title.component.css'],
})
export class ModelArtifactsTitleComponent implements OnInit {
  @Input() artifacts: ArtifactResponseModelArtifacts;

  constructor() {}

  ngOnInit(): void {}
}
