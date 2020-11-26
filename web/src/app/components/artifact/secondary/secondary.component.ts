import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-secondary',
  templateUrl: './secondary.component.html',
  styleUrls: ['./secondary.component.css'],
})
export class SecondaryComponent implements OnInit {
  @Input() secondary: string;

  constructor() {}

  ngOnInit(): void {}
}
