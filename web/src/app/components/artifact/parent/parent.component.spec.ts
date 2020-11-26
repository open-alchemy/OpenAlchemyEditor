import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentComponent } from './parent.component';

describe('ParentComponent', () => {
  let component: ParentComponent;
  let fixture: ComponentFixture<ParentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentComponent],
    });

    fixture = TestBed.createComponent(ParentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display parent', () => {
    component.parent = 'parent 1';

    fixture.detectChanges();

    const content: HTMLSpanElement = fixture.nativeElement.querySelector(
      '.content'
    );
    expect(content).toBeTruthy();
    expect(content.innerText).toEqual('parent: parent 1');
  });
});
