import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserKitComponent } from './user-kit.component';

describe('UserKitComponent', () => {
  let component: UserKitComponent;
  let fixture: ComponentFixture<UserKitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserKitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
