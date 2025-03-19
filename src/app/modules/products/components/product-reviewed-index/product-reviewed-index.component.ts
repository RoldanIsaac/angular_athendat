import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, Observable, take } from 'rxjs';
import { changeProductStatus } from '../../states/product.action';
import { Product } from '../../states/product.model';
import * as ProductActions from "../.././states/product.action"
import { selectAllProducts, selectProductLoading, selectProductError } from '../../states/product.selector';
import { NgIf, AsyncPipe } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'app-product-reviewed-index',
	imports: [
		NgIf,
		AsyncPipe,
		ProductCardComponent,
    ProductDetailsComponent,
	],
  templateUrl: './product-reviewed-index.component.html',
  styleUrl: './product-reviewed-index.component.scss'
})
export class ProductReviewedIndexComponent implements OnInit, OnDestroy {
	_unsubscribeAll: Subject<any> = new Subject<any>()
	products$: Observable<Product[] | null>
	isLoading!: Observable<boolean>
	error!: Observable<string | null>

  detailsDialog = ProductDetailsComponent;
	
	constructor(
		private store: Store,
    private _dialogService: DialogService,
	) {
		this.store.dispatch(ProductActions.loadProducts())
		this.products$ = this.store.select(selectAllProducts);
		this.isLoading = this.store.select(selectProductLoading);
		this.error = this.store.select(selectProductError);
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle Hooks
	// -----------------------------------------------------------------------------------------------------

	ngOnInit(): void {
		// this._productService.getMockApiProducts().pipe(
		// takeUntil(this._unsubscribeAll),
		// )
		// .subscribe((response) => {
		// console.log(response)
		// })
		
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete()
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public Methods
	// -----------------------------------------------------------------------------------------------------

	approveProduct(id: string): void {
		this.store.dispatch(changeProductStatus({ productId: id, status: 'approved'}))
	}

	rejectProduct(id: string): void {
		this.store.dispatch(changeProductStatus({ productId: id, status: 'rejected'}))
	}
  	
	/**
	 * @description
	 * This method is duplicated in BookingDetails component
	 * where the Booking is also able to be edited
	 * @param data 
	 */
	openDetailsDialog(product: Product) {
		this._dialogService.openModal(this.detailsDialog, product);
	}

  deleteProduct(product: Product) {
    alert('Delete')
  }
}
