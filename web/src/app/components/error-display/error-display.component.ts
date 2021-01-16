import { Component, OnDestroy } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { EditorService } from '../../services/editor/editor.service';
import { PackageService } from '../../services/package/package.service';
import { Error } from '../../services/editor/types';

@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.css'],
})
export class ErrorDisplayComponent implements OnDestroy {
  editorErrorSubscription$ = this.editorService.error$.subscribe(
    this.displayError.bind(this)
  );
  packageErrorSubscription$ = this.packageService.error$.subscribe(
    this.displayError.bind(this)
  );

  constructor(
    private snackBar: MatSnackBar,
    private editorService: EditorService,
    private packageService: PackageService
  ) {}

  displayError(error: Error) {
    this.snackBar.open(error.message, 'close');
  }

  ngOnDestroy(): void {
    this.editorErrorSubscription$.unsubscribe();
    this.packageErrorSubscription$.unsubscribe();
  }
}
