import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewkitComponent } from './admin-viewkit.component';

describe('AdminViewkitComponent', () => {
  let component: AdminViewkitComponent;
  let fixture: ComponentFixture<AdminViewkitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewkitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewkitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
