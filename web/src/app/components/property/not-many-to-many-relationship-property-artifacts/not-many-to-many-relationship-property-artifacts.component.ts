import { Component, OnInit, Input } from '@angular/core';

import { ArtifactsNotManyToManyRelationshipPropertyModel } from '../../../artifacts.model';

@Component({
  selector: 'app-not-many-to-many-relationship-property-artifacts',
  templateUrl:
    './not-many-to-many-relationship-property-artifacts.component.html',
  styleUrls: [
    './not-many-to-many-relationship-property-artifacts.component.css',
  ],
})
export class NotManyToManyRelationshipPropertyArtifactsComponent
  implements OnInit {
  @Input() artifacts: ArtifactsNotManyToManyRelationshipPropertyModel;

  constructor() {}

  ngOnInit(): void {}
}
