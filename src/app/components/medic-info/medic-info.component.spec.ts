import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicInfoComponent } from './medic-info.component';

describe('MedicInfoComponent', () => {
  let component: MedicInfoComponent;
  let fixture: ComponentFixture<MedicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
