import { Component, OnInit, Input } from '@angular/core';

import { ArtifactsCompositeUniqueItemModel } from 'src/app/artifacts.model';

@Component({
  selector: 'app-composite-unique-item',
  templateUrl: './composite-unique-item.component.html',
  styleUrls: ['./composite-unique-item.component.css'],
})
export class CompositeUniqueItemComponent implements OnInit {
  @Input() item: ArtifactsCompositeUniqueItemModel;

  constructor() {}

  ngOnInit(): void {}
}
