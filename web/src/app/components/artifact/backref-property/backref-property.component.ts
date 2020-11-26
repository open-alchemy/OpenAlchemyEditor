import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-backref-property',
  templateUrl: './backref-property.component.html',
  styleUrls: ['./backref-property.component.css'],
})
export class BackrefPropertyComponent implements OnInit {
  @Input() backref_property: string;

  constructor() {}

  ngOnInit(): void {}
}
