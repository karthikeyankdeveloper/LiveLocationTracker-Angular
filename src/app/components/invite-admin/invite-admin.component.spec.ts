import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteAdminComponent } from './invite-admin.component';

describe('InviteAdminComponent', () => {
  let component: InviteAdminComponent;
  let fixture: ComponentFixture<InviteAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
