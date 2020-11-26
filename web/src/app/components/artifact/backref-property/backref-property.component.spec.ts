import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackrefPropertyComponent } from './backref-property.component';

describe('BackrefPropertyComponent', () => {
  let component: BackrefPropertyComponent;
  let fixture: ComponentFixture<BackrefPropertyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackrefPropertyComponent],
    });

    fixture = TestBed.createComponent(BackrefPropertyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display backref property', () => {
    component.backref_property = 'backref property 1';

    fixture.detectChanges();

    const content: HTMLSpanElement = fixture.nativeElement.querySelector(
      '.content'
    );
    expect(content).toBeTruthy();
    expect(content.innerText).toEqual('backref property: backref property 1');
  });
});
