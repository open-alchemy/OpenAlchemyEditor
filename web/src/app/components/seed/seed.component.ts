import { Component, OnInit } from '@angular/core';

import { EditorService } from '../../services/editor/editor.service';
import { SeedPath } from '../../services/editor/types';

@Component({
  selector: 'app-seed',
  templateUrl: './seed.component.html',
  styleUrls: ['./seed.component.css'],
})
export class SeedComponent implements OnInit {
  public available$ = this.editorService.seedAvailable$;
  public selected$ = this.editorService.seedSelected$;

  constructor(private editorService: EditorService) {}

  ngOnInit(): void {
    this.editorService.seedComponentOnInit();
  }

  selectChange(path: SeedPath): void {
    this.editorService.seedComponentSelectChange(path);
  }
}
