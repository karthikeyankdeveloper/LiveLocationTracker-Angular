import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewkitComponent } from './viewkit.component';

describe('ViewkitComponent', () => {
  let component: ViewkitComponent;
  let fixture: ComponentFixture<ViewkitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewkitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewkitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
