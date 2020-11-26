import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryComponent } from './secondary.component';

describe('SecondaryComponent', () => {
  let component: SecondaryComponent;
  let fixture: ComponentFixture<SecondaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondaryComponent],
    });

    fixture = TestBed.createComponent(SecondaryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display secondary', () => {
    component.secondary = 'secondary 1';

    fixture.detectChanges();

    const content: HTMLSpanElement = fixture.nativeElement.querySelector(
      '.content'
    );
    expect(content).toBeTruthy();
    expect(content.innerText).toEqual('secondary: secondary 1');
  });
});
