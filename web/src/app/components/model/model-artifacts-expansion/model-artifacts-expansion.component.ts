import { Component, OnInit, Input } from '@angular/core';

import { ArtifactResponseModelArtifacts } from '../../../services/editor/types';

@Component({
  selector: 'app-model-artifacts-expansion',
  templateUrl: './model-artifacts-expansion.component.html',
  styleUrls: ['./model-artifacts-expansion.component.css'],
})
export class ModelArtifactsExpansionComponent implements OnInit {
  @Input() artifacts: ArtifactResponseModelArtifacts;

  constructor() {}

  ngOnInit(): void {}
}
