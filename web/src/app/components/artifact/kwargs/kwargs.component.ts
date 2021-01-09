import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kwargs',
  templateUrl: './kwargs.component.html',
  styleUrls: ['./kwargs.component.css'],
})
export class KwargsComponent {
  @Input() kwargs: { [key: string]: any };
}
