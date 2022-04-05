import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductNavigationComponent } from './product-navigation.component';

describe('ProductNavigationComponent', () => {
  let component: ProductNavigationComponent;
  let fixture: ComponentFixture<ProductNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
