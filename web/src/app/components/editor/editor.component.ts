import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import 'brace';
import 'brace/mode/yaml';
import 'brace/theme/terminal';
import { AceComponent } from 'ngx-ace-wrapper';

import { SeedService } from 'src/app/seed.service';
import { SpecService } from 'src/app/spec.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  @ViewChild('ace', { static: false }) ace: AceComponent;
  public seed$: Observable<string>;

  config = { tabSize: 2 };

  constructor(
    private seedService: SeedService,
    private specService: SpecService
  ) {}

  ngOnInit(): void {
    this.seed$ = this.seedService.seed$();
    this.seedService.loadSeed();
  }

  onChange(spec: string): void {
    this.specService.updateSpec(spec);
  }
}
