import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-foreign-key',
  templateUrl: './foreign-key.component.html',
  styleUrls: ['./foreign-key.component.css'],
})
export class ForeignKeyComponent {
  @Input() foreign_key: string;
}
