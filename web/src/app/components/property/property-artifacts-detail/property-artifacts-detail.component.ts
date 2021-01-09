import { Component, OnInit, Input } from '@angular/core';

import { ArtifactResponsePropertyAll } from '../../../services/editor/types';

@Component({
  selector: 'app-property-artifacts-detail',
  templateUrl: './property-artifacts-detail.component.html',
  styleUrls: ['./property-artifacts-detail.component.css'],
})
export class PropertyArtifactsDetailComponent implements OnInit {
  @Input() artifacts: ArtifactResponsePropertyAll;

  constructor() {}

  ngOnInit(): void {}
}
