import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SeedService } from '../../seed.service';
import { SeedsModel, SeedModel } from '../../seed.model';

@Component({
  selector: 'app-seed',
  templateUrl: './seed.component.html',
  styleUrls: ['./seed.component.css'],
})
export class SeedComponent implements OnInit {
  public seeds$: Observable<SeedsModel>;

  constructor(private seedService: SeedService) {}

  ngOnInit(): void {
    this.seeds$ = this.seedService.seeds$();
    this.seedService.loadSeeds();
  }

  selectChange(seed: SeedModel): void {
    this.seedService.selectSeed(seed.name);
  }
}
