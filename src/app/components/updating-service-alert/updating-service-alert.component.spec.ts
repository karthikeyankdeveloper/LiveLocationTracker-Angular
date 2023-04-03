import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatingServiceAlertComponent } from './updating-service-alert.component';

describe('UpdatingServiceAlertComponent', () => {
  let component: UpdatingServiceAlertComponent;
  let fixture: ComponentFixture<UpdatingServiceAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatingServiceAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatingServiceAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
