import { Component, OnInit, Input } from '@angular/core';

import { ArtifactsSimplePropertyModel } from '../../../artifacts.model';

@Component({
  selector: 'app-simple-property-artifacts',
  templateUrl: './simple-property-artifacts.component.html',
  styleUrls: ['./simple-property-artifacts.component.css'],
})
export class SimplePropertyArtifactsComponent implements OnInit {
  @Input() artifacts: ArtifactsSimplePropertyModel;
  constructor() {}

  ngOnInit(): void {}
}
