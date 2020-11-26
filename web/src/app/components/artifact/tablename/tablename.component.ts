import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tablename',
  templateUrl: './tablename.component.html',
  styleUrls: ['./tablename.component.css'],
})
export class TablenameComponent implements OnInit {
  @Input() tablename: string;

  constructor() {}

  ngOnInit(): void {}
}
