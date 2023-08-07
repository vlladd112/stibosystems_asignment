import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsDetailsComponent } from './payments-details.component';

describe('PaymentsDetailsComponent', () => {
  let component: PaymentsDetailsComponent;
  let fixture: ComponentFixture<PaymentsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaymentsDetailsComponent]
    });
    fixture = TestBed.createComponent(PaymentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
