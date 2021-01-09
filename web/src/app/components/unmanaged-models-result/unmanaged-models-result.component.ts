import { Component } from '@angular/core';

import { EditorService } from '../../services/editor/editor.service';
import { ValidatorModel } from 'src/app/validator.model';

@Component({
  selector: 'app-unmanaged-models-result',
  templateUrl: './unmanaged-models-result.component.html',
  styleUrls: ['./unmanaged-models-result.component.css'],
})
export class UnmanagedModelsResultComponent {
  result$ = this.editorService.validateUnManaged$;

  constructor(private editorService: EditorService) {}

  hasModels(result: ValidatorModel): boolean {
    if (result.models === undefined || result.models === null) {
      return false;
    }
    return Object.keys(result.models).length !== 0;
  }
}
