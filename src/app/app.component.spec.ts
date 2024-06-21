import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';

import {
  NgxVcardModule
} from "projects/ngx-vcard/src/public_api";
// import { NgxVcardModule } from 'ngx-vcard';
describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [NgxVcardModule]
    }).compileComponents();
  }));
  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
