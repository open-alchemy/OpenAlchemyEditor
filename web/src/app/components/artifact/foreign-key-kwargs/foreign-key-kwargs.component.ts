import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-foreign-key-kwargs',
  templateUrl: './foreign-key-kwargs.component.html',
  styleUrls: ['./foreign-key-kwargs.component.css'],
})
export class ForeignKeyKwargsComponent {
  @Input() foreign_key_kwargs: { [key: string]: any };
}
