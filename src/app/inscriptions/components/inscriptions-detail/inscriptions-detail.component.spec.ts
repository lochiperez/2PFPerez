import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionsDetailComponent } from './inscriptions-detail.component';

describe('InscriptionsDetailComponent', () => {
  let component: InscriptionsDetailComponent;
  let fixture: ComponentFixture<InscriptionsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
