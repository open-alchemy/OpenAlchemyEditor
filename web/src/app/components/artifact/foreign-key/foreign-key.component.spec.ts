import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignKeyComponent } from './foreign-key.component';

describe('ForeignKeyComponent', () => {
  let component: ForeignKeyComponent;
  let fixture: ComponentFixture<ForeignKeyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForeignKeyComponent],
    });

    fixture = TestBed.createComponent(ForeignKeyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display foreign key', () => {
    component.foreign_key = 'foreign key 1';

    fixture.detectChanges();

    const content: HTMLSpanElement = fixture.nativeElement.querySelector(
      '.content'
    );
    expect(content).toBeTruthy();
    expect(content.innerText).toEqual('foreign key: foreign key 1');
  });
});
