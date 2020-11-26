import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignKeyPropertyComponent } from './foreign-key-property.component';

describe('ForeignKeyPropertyComponent', () => {
  let component: ForeignKeyPropertyComponent;
  let fixture: ComponentFixture<ForeignKeyPropertyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForeignKeyPropertyComponent],
    });

    fixture = TestBed.createComponent(ForeignKeyPropertyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display foreign key property', () => {
    component.foreign_key_property = 'foreign key property 1';

    fixture.detectChanges();

    const content: HTMLSpanElement = fixture.nativeElement.querySelector(
      '.content'
    );
    expect(content).toBeTruthy();
    expect(content.innerText).toEqual(
      'foreign key property: foreign key property 1'
    );
  });
});
