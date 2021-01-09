import { Component, OnInit, ViewChild } from '@angular/core';

import 'brace';
import 'brace/mode/yaml';
import 'brace/theme/terminal';
import { AceComponent } from 'ngx-ace-wrapper';

import { EditorService } from '../../services/editor/editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  @ViewChild('ace', { static: false }) ace: AceComponent;
  public seed$ = this.editorService.seedCurrent$;

  config = { tabSize: 2 };

  constructor(private editorService: EditorService) {}

  ngOnInit(): void {
    this.editorService.editorComponentOnInit();
  }

  onChange(spec: string, sameAsSeed: boolean): void {
    if (sameAsSeed) {
      this.editorService.editorComponentSeedLoaded(spec);
    } else {
      this.editorService.editorComponentValueChange(spec);
    }
  }
}
