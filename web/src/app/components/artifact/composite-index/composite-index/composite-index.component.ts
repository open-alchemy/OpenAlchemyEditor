import { Component, OnInit, Input } from '@angular/core';

import { ArtifactsCompositeIndexModel } from '../../../../artifacts.model';

@Component({
  selector: 'app-composite-index',
  templateUrl: './composite-index.component.html',
  styleUrls: ['./composite-index.component.css'],
})
export class CompositeIndexComponent implements OnInit {
  @Input() composite_index: ArtifactsCompositeIndexModel;

  constructor() {}

  ngOnInit(): void {}
}
