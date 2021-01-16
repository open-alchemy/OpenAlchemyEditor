import { Component, Input } from '@angular/core';

const SELECTOR = 'app-check';

@Component({
  selector: SELECTOR,
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css'],
})
export class CheckComponent {
  @Input() description: string | null = null;
  @Input() value: boolean | null = null;
  @Input() hint: string | null = null;
  selector = SELECTOR;
}
