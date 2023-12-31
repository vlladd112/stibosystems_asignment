import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDetailsComponent } from './users-details.component';

describe('DetailsComponent', () => {
  let component: UsersDetailsComponent;
  let fixture: ComponentFixture<UsersDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UsersDetailsComponent]
    });
    fixture = TestBed.createComponent(UsersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
