import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBuyComponent } from './user-buy.component';

describe('UserBuyComponent', () => {
  let component: UserBuyComponent;
  let fixture: ComponentFixture<UserBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBuyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
