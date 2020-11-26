import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.css'],
})
export class SchemaComponent implements OnInit {
  @Input() schema: any;

  constructor() {}

  ngOnInit(): void {}
}
