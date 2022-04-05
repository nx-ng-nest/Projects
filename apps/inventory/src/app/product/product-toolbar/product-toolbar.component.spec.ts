import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductToolbarComponent } from './product-toolbar.component';

describe('ProductToolbarComponent', () => {
  let component: ProductToolbarComponent;
  let fixture: ComponentFixture<ProductToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
