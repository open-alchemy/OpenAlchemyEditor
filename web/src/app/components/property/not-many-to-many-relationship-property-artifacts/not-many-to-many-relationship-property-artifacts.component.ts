import { Component, Input } from '@angular/core';

import { ArtifactResponsePropertiesRelationshipNotManyToMany } from '../../../services/editor/types';

@Component({
  selector: 'app-not-many-to-many-relationship-property-artifacts',
  templateUrl:
    './not-many-to-many-relationship-property-artifacts.component.html',
  styleUrls: [
    './not-many-to-many-relationship-property-artifacts.component.css',
  ],
})
export class NotManyToManyRelationshipPropertyArtifactsComponent {
  @Input() artifacts: ArtifactResponsePropertiesRelationshipNotManyToMany;
}
