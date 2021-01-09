import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.css'],
})
export class SchemaComponent {
  @Input() schema: any;
}
