import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaComponent } from './schema.component';

describe('SchemaComponent', () => {
  let component: SchemaComponent;
  let fixture: ComponentFixture<SchemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchemaComponent],
    });

    fixture = TestBed.createComponent(SchemaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display schema', () => {
    component.schema = { key: 'value' };

    fixture.detectChanges();

    const content: HTMLSpanElement = fixture.nativeElement.querySelector(
      '.content'
    );
    expect(content).toBeTruthy();
    expect(content.innerText).toEqual('schema: { "key": "value" }');
  });
});
