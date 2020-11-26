import { Component, OnInit, Input } from '@angular/core';

import { ArtifactsModelArtifactsModel } from '../../../artifacts.model';

@Component({
  selector: 'app-model-artifacts',
  templateUrl: './model-artifacts.component.html',
  styleUrls: ['./model-artifacts.component.css'],
})
export class ModelArtifactsComponent implements OnInit {
  @Input() artifacts: ArtifactsModelArtifactsModel;

  constructor() {}

  ngOnInit(): void {}
}
