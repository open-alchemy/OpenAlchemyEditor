import { Component, OnInit, Input } from '@angular/core';

import { ArtifactsCompositeUniqueModel } from '../../../../artifacts.model';

@Component({
  selector: 'app-composite-unique',
  templateUrl: './composite-unique.component.html',
  styleUrls: ['./composite-unique.component.css'],
})
export class CompositeUniqueComponent implements OnInit {
  @Input() composite_unique: ArtifactsCompositeUniqueModel;

  constructor() {}

  ngOnInit(): void {}
}
