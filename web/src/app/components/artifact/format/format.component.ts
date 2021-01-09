import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-format',
  templateUrl: './format.component.html',
  styleUrls: ['./format.component.css'],
})
export class FormatComponent {
  @Input() format: string;
}
