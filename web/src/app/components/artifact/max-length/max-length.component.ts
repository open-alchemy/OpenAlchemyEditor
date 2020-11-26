import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-max-length',
  templateUrl: './max-length.component.html',
  styleUrls: ['./max-length.component.css'],
})
export class MaxLengthComponent implements OnInit {
  @Input() max_length: number;

  constructor() {}

  ngOnInit(): void {}
}
