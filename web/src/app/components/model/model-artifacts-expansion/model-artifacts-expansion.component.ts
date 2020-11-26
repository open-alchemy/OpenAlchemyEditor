import { Component, OnInit, Input } from '@angular/core';

import { ArtifactsModelArtifactsModel } from '../../../artifacts.model';

@Component({
  selector: 'app-model-artifacts-expansion',
  templateUrl: './model-artifacts-expansion.component.html',
  styleUrls: ['./model-artifacts-expansion.component.css'],
})
export class ModelArtifactsExpansionComponent implements OnInit {
  @Input() artifacts: ArtifactsModelArtifactsModel;

  constructor() {}

  ngOnInit(): void {}
}
