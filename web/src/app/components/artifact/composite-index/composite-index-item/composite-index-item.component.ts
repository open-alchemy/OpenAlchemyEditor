import { Component, OnInit, Input } from '@angular/core';

import { ArtifactsCompositeIndexItemModel } from 'src/app/artifacts.model';

@Component({
  selector: 'app-composite-index-item',
  templateUrl: './composite-index-item.component.html',
  styleUrls: ['./composite-index-item.component.css'],
})
export class CompositeIndexItemComponent implements OnInit {
  @Input() item: ArtifactsCompositeIndexItemModel;

  constructor() {}

  ngOnInit(): void {}
}
