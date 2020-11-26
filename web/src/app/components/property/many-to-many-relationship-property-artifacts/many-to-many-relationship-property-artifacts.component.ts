import { Component, OnInit, Input } from '@angular/core';

import { ArtifactsManyToManyRelationshipPropertyModel } from '../../../artifacts.model';

@Component({
  selector: 'app-many-to-many-relationship-property-artifacts',
  templateUrl: './many-to-many-relationship-property-artifacts.component.html',
  styleUrls: ['./many-to-many-relationship-property-artifacts.component.css'],
})
export class ManyToManyRelationshipPropertyArtifactsComponent
  implements OnInit {
  @Input() artifacts: ArtifactsManyToManyRelationshipPropertyModel;

  constructor() {}

  ngOnInit(): void {}
}
