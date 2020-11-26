import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeComponent } from './type.component';

describe('TypeComponent', () => {
  let component: TypeComponent;
  let fixture: ComponentFixture<TypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeComponent],
    });

    fixture = TestBed.createComponent(TypeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display type', () => {
    component.type = 'type 1';

    fixture.detectChanges();

    const content: HTMLSpanElement = fixture.nativeElement.querySelector(
      '.content'
    );
    expect(content).toBeTruthy();
    expect(content.innerText).toEqual('type: type 1');
  });
});
