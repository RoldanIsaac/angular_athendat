import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ProductService } from '../../product.service';
import { changeProductStatus } from '../../states/product.action';
import * as ProductActions from "../.././states/product.action"
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Product } from '../../states/product.model';
import { selectAllProducts, selectProductError, selectProductLoading } from '../../states/product.selector';
import { AsyncPipe, NgIf } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
	selector: 'app-product-unreviewed-index',
	imports: [
		NgIf,
		AsyncPipe,
		ProductCardComponent
	],
	templateUrl: './product-unreviewed-index.component.html',
	styleUrl: './product-unreviewed-index.component.scss'
})
export class ProductUnreviewedIndexComponent implements OnInit, OnDestroy {
	_unsubscribeAll: Subject<any> = new Subject<any>()
	products$: Observable<Product[] | null>
	isLoading!: Observable<boolean>
	error!: Observable<string | null>
	
	constructor(
		private store: Store
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
}