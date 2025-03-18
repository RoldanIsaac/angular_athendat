import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUnreviewedIndexComponent } from './product-unreviewed-index.component';

describe('ProductUnreviewedIndexComponent', () => {
  let component: ProductUnreviewedIndexComponent;
  let fixture: ComponentFixture<ProductUnreviewedIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductUnreviewedIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductUnreviewedIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
