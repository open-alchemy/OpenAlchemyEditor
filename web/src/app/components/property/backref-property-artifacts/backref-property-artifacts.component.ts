import { Component, OnInit, Input } from '@angular/core';

import { ArtifactsBackrefPropertyModel } from '../../../artifacts.model';

@Component({
  selector: 'app-backref-property-artifacts',
  templateUrl: './backref-property-artifacts.component.html',
  styleUrls: ['./backref-property-artifacts.component.css'],
})
export class BackrefPropertyArtifactsComponent implements OnInit {
  @Input() artifacts: ArtifactsBackrefPropertyModel;

  constructor() {}

  ngOnInit(): void {}
}
