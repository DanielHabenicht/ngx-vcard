import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxVcardComponent } from './ngx-vcard.component';

describe('NgxVcardComponent', () => {
  let component: NgxVcardComponent;
  let fixture: ComponentFixture<NgxVcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxVcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxVcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
