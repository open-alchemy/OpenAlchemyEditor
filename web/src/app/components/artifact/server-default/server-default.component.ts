import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-server-default',
  templateUrl: './server-default.component.html',
  styleUrls: ['./server-default.component.css'],
})
export class ServerDefaultComponent {
  @Input() server_default: string;
}
