import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-foreign-key-property',
  templateUrl: './foreign-key-property.component.html',
  styleUrls: ['./foreign-key-property.component.css'],
})
export class ForeignKeyPropertyComponent implements OnInit {
  @Input() foreign_key_property: string;

  constructor() {}

  ngOnInit(): void {}
}
