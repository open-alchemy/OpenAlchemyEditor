import { Component, OnInit, Input } from '@angular/core';

import { ArtifactsPropertyArtifactsModel } from '../../../artifacts.model';

@Component({
  selector: 'app-property-artifacts-title',
  templateUrl: './property-artifacts-title.component.html',
  styleUrls: ['./property-artifacts-title.component.css'],
})
export class PropertyArtifactsTitleComponent implements OnInit {
  @Input() artifacts: ArtifactsPropertyArtifactsModel;

  constructor() {}

  ngOnInit(): void {}
}
