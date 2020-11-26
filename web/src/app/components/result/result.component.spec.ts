import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconModule } from '@angular/material/icon';

import { ResultComponent } from './result.component';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultComponent],
      imports: [MatIconModule],
    });

    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('valid false', () => {
    it('should display the reason and the symbol', () => {
      component.model = { valid: false, reason: 'reason 1' };
      component.symbol = 'info';

      fixture.detectChanges();

      const span: HTMLSpanElement = fixture.nativeElement.querySelector('span');
      expect(span).toBeTruthy();
      expect(span.innerText).toEqual('reason 1');
      const icon: HTMLSpanElement = fixture.nativeElement.querySelector(
        '.icon'
      );
      expect(icon).toBeTruthy();
      expect(icon.innerText).toEqual('info');
    });

    it('should display the reason and the default symbol', () => {
      component.model = { valid: false, reason: 'reason 1' };

      fixture.detectChanges();

      const span: HTMLSpanElement = fixture.nativeElement.querySelector('span');
      expect(span).toBeTruthy();
      expect(span.innerText).toEqual('reason 1');
      const icon: HTMLSpanElement = fixture.nativeElement.querySelector(
        '.icon'
      );
      expect(icon).toBeTruthy();
      expect(icon.innerText).toEqual('error');
    });
  });

  describe('valid true', () => {
    it('should not display the reason', () => {
      component.model = { valid: true, reason: 'reason 1' };

      fixture.detectChanges();

      const span: HTMLSpanElement = fixture.nativeElement.querySelector('span');
      expect(span).toBeFalsy();
    });
  });

  describe('model null', () => {
    it('should not display the reason', () => {
      component.model = null;

      fixture.detectChanges();

      const span: HTMLSpanElement = fixture.nativeElement.querySelector('span');
      expect(span).toBeFalsy();
    });
  });
});
