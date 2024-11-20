import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburgerListComponent } from './hamburger-list.component';

describe('HamburgerListComponent', () => {
  let component: HamburgerListComponent;
  let fixture: ComponentFixture<HamburgerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HamburgerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HamburgerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
