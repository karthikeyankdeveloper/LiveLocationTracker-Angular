import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNavigationComponent } from './user-navigation.component';

describe('UserNavigationComponent', () => {
  let component: UserNavigationComponent;
  let fixture: ComponentFixture<UserNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
