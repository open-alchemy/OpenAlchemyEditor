import { Component, OnInit, Input } from '@angular/core';

import { ArtifactsRelationshipPropertyModel } from '../../../artifacts.model';

export interface ArtifactsRelationshipPropertyModelWithNullable
  extends ArtifactsRelationshipPropertyModel {
  nullable?: boolean;
}

@Component({
  selector: 'app-relationship-property-artifacts',
  templateUrl: './relationship-property-artifacts.component.html',
  styleUrls: ['./relationship-property-artifacts.component.css'],
})
export class RelationshipPropertyArtifactsComponent implements OnInit {
  @Input() artifacts: ArtifactsRelationshipPropertyModelWithNullable;
  constructor() {}

  ngOnInit(): void {}
}
