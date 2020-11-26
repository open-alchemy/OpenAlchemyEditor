import { Component, OnInit, Input } from '@angular/core';

import { ArtifactsModelArtifactsModel } from '../../../artifacts.model';

@Component({
  selector: 'app-model-artifacts-detail',
  templateUrl: './model-artifacts-detail.component.html',
  styleUrls: ['./model-artifacts-detail.component.css'],
})
export class ModelArtifactsDetailComponent implements OnInit {
  @Input() artifacts: ArtifactsModelArtifactsModel;

  constructor() {}

  ngOnInit(): void {}
}
