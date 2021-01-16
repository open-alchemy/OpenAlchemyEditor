import { Component, OnDestroy } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { EditorService } from '../../services/editor/editor.service';
import { Error } from '../../services/editor/types';

@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.css'],
})
export class ErrorDisplayComponent implements OnDestroy {
  errorSubscription$ = this.editorService.error$.subscribe(
    this.displayError.bind(this)
  );

  constructor(
    private snackBar: MatSnackBar,
    private editorService: EditorService
  ) {}

  displayError(error: Error) {
    this.snackBar.open(error.message, 'close');
  }

  ngOnDestroy(): void {
    this.errorSubscription$.unsubscribe();
  }
}
