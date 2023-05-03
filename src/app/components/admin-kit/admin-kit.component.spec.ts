import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKitComponent } from './admin-kit.component';

describe('AdminKitComponent', () => {
  let component: AdminKitComponent;
  let fixture: ComponentFixture<AdminKitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminKitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
