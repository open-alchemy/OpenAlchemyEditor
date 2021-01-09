import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-secondary',
  templateUrl: './secondary.component.html',
  styleUrls: ['./secondary.component.css'],
})
export class SecondaryComponent {
  @Input() secondary: string;
}
