import { Component, OnInit, Input } from '@angular/core';

import { ArtifactsPropertyArtifactsModel } from '../../../artifacts.model';

@Component({
  selector: 'app-property-artifacts',
  templateUrl: './property-artifacts.component.html',
  styleUrls: ['./property-artifacts.component.css'],
})
export class PropertyArtifactsComponent implements OnInit {
  @Input() artifacts: ArtifactsPropertyArtifactsModel;

  constructor() {}

  ngOnInit(): void {}
}
