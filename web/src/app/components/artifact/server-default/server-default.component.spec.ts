import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerDefaultComponent } from './server-default.component';

describe('ServerDefaultComponent', () => {
  let component: ServerDefaultComponent;
  let fixture: ComponentFixture<ServerDefaultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServerDefaultComponent],
    });

    fixture = TestBed.createComponent(ServerDefaultComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display default', () => {
    component.server_default = 'default 1';

    fixture.detectChanges();

    const content: HTMLSpanElement = fixture.nativeElement.querySelector(
      '.content'
    );
    expect(content).toBeTruthy();
    expect(content.innerText).toEqual('server default: default 1');
  });
});
