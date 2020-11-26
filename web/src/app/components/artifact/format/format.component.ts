import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-format',
  templateUrl: './format.component.html',
  styleUrls: ['./format.component.css'],
})
export class FormatComponent implements OnInit {
  @Input() format: string;

  constructor() {}

  ngOnInit(): void {}
}
