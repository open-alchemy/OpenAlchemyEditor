import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-foreign-key',
  templateUrl: './foreign-key.component.html',
  styleUrls: ['./foreign-key.component.css'],
})
export class ForeignKeyComponent implements OnInit {
  @Input() foreign_key: string;

  constructor() {}

  ngOnInit(): void {}
}
