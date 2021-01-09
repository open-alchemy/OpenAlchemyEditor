import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-foreign-key-property',
  templateUrl: './foreign-key-property.component.html',
  styleUrls: ['./foreign-key-property.component.css'],
})
export class ForeignKeyPropertyComponent {
  @Input() foreign_key_property: string;
}
