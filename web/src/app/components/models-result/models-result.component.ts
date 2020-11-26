import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ResultService } from 'src/app/result.service';
import { ResultModel } from 'src/app/result.model';

@Component({
  selector: 'app-models-result',
  templateUrl: './models-result.component.html',
  styleUrls: ['./models-result.component.css'],
})
export class ModelsResultComponent implements OnInit {
  result$: Observable<ResultModel>;

  constructor(private ValidatorResultService: ResultService) {}

  ngOnInit(): void {
    this.result$ = this.ValidatorResultService.result$();
  }
}
