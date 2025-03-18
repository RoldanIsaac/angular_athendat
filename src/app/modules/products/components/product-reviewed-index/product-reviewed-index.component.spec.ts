import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReviewedIndexComponent } from './product-reviewed-index.component';

describe('ProductReviewedIndexComponent', () => {
  let component: ProductReviewedIndexComponent;
  let fixture: ComponentFixture<ProductReviewedIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductReviewedIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductReviewedIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
