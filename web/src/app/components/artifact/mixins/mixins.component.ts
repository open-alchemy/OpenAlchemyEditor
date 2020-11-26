import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mixins',
  templateUrl: './mixins.component.html',
  styleUrls: ['./mixins.component.css'],
})
export class MixinsComponent implements OnInit {
  @Input() mixins: string[];

  constructor() {}

  ngOnInit(): void {}
}
