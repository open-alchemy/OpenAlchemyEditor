import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-kwargs',
  templateUrl: './kwargs.component.html',
  styleUrls: ['./kwargs.component.css'],
})
export class KwargsComponent implements OnInit {
  @Input() kwargs: { [key: string]: any };

  constructor() {}

  ngOnInit(): void {}
}
