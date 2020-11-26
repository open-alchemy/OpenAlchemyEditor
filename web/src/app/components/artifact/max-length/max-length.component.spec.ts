import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxLengthComponent } from './max-length.component';

describe('MaxLengthComponent', () => {
  let component: MaxLengthComponent;
  let fixture: ComponentFixture<MaxLengthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaxLengthComponent],
    });

    fixture = TestBed.createComponent(MaxLengthComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display max length', () => {
    component.max_length = 1;

    fixture.detectChanges();

    const content: HTMLSpanElement = fixture.nativeElement.querySelector(
      '.content'
    );
    expect(content).toBeTruthy();
    expect(content.innerText).toEqual('max length: 1');
  });
});
