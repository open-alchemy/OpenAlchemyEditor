import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultComponent } from './default.component';

describe('DefaultComponent', () => {
  let component: DefaultComponent;
  let fixture: ComponentFixture<DefaultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultComponent],
    });

    fixture = TestBed.createComponent(DefaultComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display default', () => {
    component.default = 'default 1';

    fixture.detectChanges();

    const content: HTMLSpanElement = fixture.nativeElement.querySelector(
      '.content'
    );
    expect(content).toBeTruthy();
    expect(content.innerText).toEqual('default: default 1');
  });
});
