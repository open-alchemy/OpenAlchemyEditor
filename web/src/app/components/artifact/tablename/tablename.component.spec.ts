import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablenameComponent } from './tablename.component';

describe('TablenameComponent', () => {
  let component: TablenameComponent;
  let fixture: ComponentFixture<TablenameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablenameComponent],
    });

    fixture = TestBed.createComponent(TablenameComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display tablename', () => {
    component.tablename = 'tablename 1';

    fixture.detectChanges();

    const content: HTMLSpanElement = fixture.nativeElement.querySelector(
      '.content'
    );
    expect(content).toBeTruthy();
    expect(content.innerText).toEqual('tablename: tablename 1');
  });
});
