import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatComponent } from './format.component';

describe('FormatComponent', () => {
  let component: FormatComponent;
  let fixture: ComponentFixture<FormatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormatComponent],
    });

    fixture = TestBed.createComponent(FormatComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display format', () => {
    component.format = 'format 1';

    fixture.detectChanges();

    const content: HTMLSpanElement = fixture.nativeElement.querySelector(
      '.content'
    );
    expect(content).toBeTruthy();
    expect(content.innerText).toEqual('format: format 1');
  });
});
