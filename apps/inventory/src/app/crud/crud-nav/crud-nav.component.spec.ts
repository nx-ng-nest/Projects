import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudNavComponent } from './crud-nav.component';

describe('CrudNavComponent', () => {
  let component: CrudNavComponent;
  let fixture: ComponentFixture<CrudNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
