import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMPTY, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EditorService } from '../../services/editor/editor.service';
import { ErrorDisplayComponent } from './error-display.component';

describe('ErrorDisplayComponent', () => {
  let component: ErrorDisplayComponent;
  let fixture: ComponentFixture<ErrorDisplayComponent>;
  let editorServiceSpy: jasmine.SpyObj<EditorService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    editorServiceSpy = jasmine.createSpyObj('EditorService', [
      'editorComponentOnInit',
    ]);
    (editorServiceSpy as any).error$ = EMPTY;
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [ErrorDisplayComponent],
      providers: [
        { provide: EditorService, useValue: editorServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    });
  });

  it('should create', () => {
    fixture = TestBed.createComponent(ErrorDisplayComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should call open on snack bar when an error is emitted', () => {
    // GIVEN single error emission
    const message = 'message 1';
    (editorServiceSpy as any).error$ = of({ message });

    // WHEN component is created
    fixture = TestBed.createComponent(ErrorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // THEN open has been called
    expect(snackBarSpy.open).toHaveBeenCalledOnceWith(message, 'close');
  });
});
