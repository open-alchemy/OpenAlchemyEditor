import { Component, OnInit, Input } from '@angular/core';

import { ArtifactsJsonPropertyModel } from '../../../artifacts.model';

@Component({
  selector: 'app-json-property-artifacts',
  templateUrl: './json-property-artifacts.component.html',
  styleUrls: ['./json-property-artifacts.component.css'],
})
export class JsonPropertyArtifactsComponent implements OnInit {
  @Input() artifacts: ArtifactsJsonPropertyModel;
  constructor() {}

  ngOnInit(): void {}
}
