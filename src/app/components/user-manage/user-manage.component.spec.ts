import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManageComponent } from './user-manage.component';

describe('UserManageComponent', () => {
  let component: UserManageComponent;
  let fixture: ComponentFixture<UserManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
