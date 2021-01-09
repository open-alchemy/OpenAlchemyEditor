import { Component } from '@angular/core';

import { EditorService } from '../../services/editor/editor.service';

@Component({
  selector: 'app-models-result',
  templateUrl: './models-result.component.html',
  styleUrls: ['./models-result.component.css'],
})
export class ModelsResultComponent {
  result$ = this.editorService.result$;

  constructor(private editorService: EditorService) {}
}
