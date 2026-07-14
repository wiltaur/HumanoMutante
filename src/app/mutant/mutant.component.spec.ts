import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutantComponent } from './mutant.component';

describe('MutantComponent', () => {
  let component: MutantComponent;
  let fixture: ComponentFixture<MutantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MutantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MutantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
