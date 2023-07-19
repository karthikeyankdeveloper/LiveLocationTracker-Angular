import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProductComponent } from './user-product.component';

describe('UserProductComponent', () => {
  let component: UserProductComponent;
  let fixture: ComponentFixture<UserProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
