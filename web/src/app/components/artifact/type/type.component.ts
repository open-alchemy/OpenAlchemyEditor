import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css'],
})
export class TypeComponent {
  @Input() type: string;
}
