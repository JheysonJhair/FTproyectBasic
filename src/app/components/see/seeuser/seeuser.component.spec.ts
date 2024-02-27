import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeuserComponent } from './seeuser.component';

describe('SeeuserComponent', () => {
  let component: SeeuserComponent;
  let fixture: ComponentFixture<SeeuserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeeuserComponent]
    });
    fixture = TestBed.createComponent(SeeuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
