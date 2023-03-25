import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChambreComponent } from './create-chambre.component';

describe('CreateChambreComponent', () => {
  let component: CreateChambreComponent;
  let fixture: ComponentFixture<CreateChambreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateChambreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateChambreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
