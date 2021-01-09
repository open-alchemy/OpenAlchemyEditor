import { Component, Input } from '@angular/core';

import { ArtifactResponsePropertyRelationshipManyToMany } from '../../../services/editor/types';

@Component({
  selector: 'app-many-to-many-relationship-property-artifacts',
  templateUrl: './many-to-many-relationship-property-artifacts.component.html',
  styleUrls: ['./many-to-many-relationship-property-artifacts.component.css'],
})
export class ManyToManyRelationshipPropertyArtifactsComponent {
  @Input() artifacts: ArtifactResponsePropertyRelationshipManyToMany;
}
