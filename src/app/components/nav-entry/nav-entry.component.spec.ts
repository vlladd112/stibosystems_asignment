import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavEntryComponent } from './nav-entry.component';

describe('NavEntryComponent', () => {
  let component: NavEntryComponent;
  let fixture: ComponentFixture<NavEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavEntryComponent]
    });
    fixture = TestBed.createComponent(NavEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
