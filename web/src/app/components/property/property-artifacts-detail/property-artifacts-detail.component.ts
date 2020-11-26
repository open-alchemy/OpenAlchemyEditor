import { Component, OnInit, Input } from '@angular/core';

import { ArtifactsPropertyArtifactsModel } from '../../../artifacts.model';

@Component({
  selector: 'app-property-artifacts-detail',
  templateUrl: './property-artifacts-detail.component.html',
  styleUrls: ['./property-artifacts-detail.component.css'],
})
export class PropertyArtifactsDetailComponent implements OnInit {
  @Input() artifacts: ArtifactsPropertyArtifactsModel;

  constructor() {}

  ngOnInit(): void {}
}
