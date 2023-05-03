import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageAllComponent } from './admin-manage-all.component';

describe('AdminManageAllComponent', () => {
  let component: AdminManageAllComponent;
  let fixture: ComponentFixture<AdminManageAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManageAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManageAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
