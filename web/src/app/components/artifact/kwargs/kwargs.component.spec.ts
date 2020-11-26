import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KwargsComponent } from './kwargs.component';

describe('KwargsComponent', () => {
  let component: KwargsComponent;
  let fixture: ComponentFixture<KwargsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KwargsComponent],
    });

    fixture = TestBed.createComponent(KwargsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display kwargs', () => {
    component.kwargs = { key: 'value' };

    fixture.detectChanges();

    const content: HTMLSpanElement = fixture.nativeElement.querySelector(
      '.content'
    );
    expect(content).toBeTruthy();
    expect(content.innerText).toEqual('kwargs: { "key": "value" }');
  });
});
