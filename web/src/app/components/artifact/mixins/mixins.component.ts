import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mixins',
  templateUrl: './mixins.component.html',
  styleUrls: ['./mixins.component.css'],
})
export class MixinsComponent {
  @Input() mixins: string[];
}
