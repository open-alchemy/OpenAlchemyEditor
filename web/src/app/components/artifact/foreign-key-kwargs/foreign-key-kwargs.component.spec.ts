import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignKeyKwargsComponent } from './foreign-key-kwargs.component';

describe('ForeignKeyKwargsComponent', () => {
  let component: ForeignKeyKwargsComponent;
  let fixture: ComponentFixture<ForeignKeyKwargsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForeignKeyKwargsComponent],
    });

    fixture = TestBed.createComponent(ForeignKeyKwargsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display foreign key kwargs', () => {
    component.foreign_key_kwargs = { key: 'value' };

    fixture.detectChanges();

    const content: HTMLSpanElement = fixture.nativeElement.querySelector(
      '.content'
    );
    expect(content).toBeTruthy();
    expect(content.innerText).toEqual('foreign key kwargs: { "key": "value" }');
  });
});
