import { Component, Input } from '@angular/core';

import { ArtifactResponsePropertiesBackref } from '../../../services/editor/types';

@Component({
  selector: 'app-backref-property-artifacts',
  templateUrl: './backref-property-artifacts.component.html',
  styleUrls: ['./backref-property-artifacts.component.css'],
})
export class BackrefPropertyArtifactsComponent {
  @Input() artifacts: ArtifactResponsePropertiesBackref;
}
