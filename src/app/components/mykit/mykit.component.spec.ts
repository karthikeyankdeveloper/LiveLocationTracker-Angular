import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MykitComponent } from './mykit.component';

describe('MykitComponent', () => {
  let component: MykitComponent;
  let fixture: ComponentFixture<MykitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MykitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MykitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
