import { Component, OnInit, Input } from '@angular/core';

import { ArtifactsPropertyArtifactsModel } from '../../../artifacts.model';

@Component({
  selector: 'app-property-artifacts-expansion',
  templateUrl: './property-artifacts-expansion.component.html',
  styleUrls: ['./property-artifacts-expansion.component.css'],
})
export class PropertyArtifactsExpansionComponent implements OnInit {
  @Input() artifacts: ArtifactsPropertyArtifactsModel;

  constructor() {}

  ngOnInit(): void {}
}
