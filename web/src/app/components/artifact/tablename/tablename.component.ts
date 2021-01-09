import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tablename',
  templateUrl: './tablename.component.html',
  styleUrls: ['./tablename.component.css'],
})
export class TablenameComponent {
  @Input() tablename: string;
}
