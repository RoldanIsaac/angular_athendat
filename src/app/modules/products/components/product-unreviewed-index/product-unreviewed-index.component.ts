import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ProductService } from '../../product.service';
import { changeProductStatus } from '../../states/product.action';
import * as ProductActions from "../.././states/product.action"
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Product } from '../../states/product.model';
import { selectAllProducts, selectProductError } from '../../states/product.selector';
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

	http = inject(HttpClient);
	// productApi = inject(ProductApiService);
	// product$ = this.productApi.getProducts() as Observable<any>;
	
	error!: Observable<string | null>
	products$: Observable<Product[] | null>
	
	constructor(
		private store: Store<{ cart: { products: any[] }}>
		// private _productService: ProductService
	) {
		this.store.dispatch(ProductActions.loadProducts())
		this.products$ = this.store.select(selectAllProducts);
		this.error = this.store.select(selectProductError);
	}

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

	approveProduct(id: string): void {
		this.store.dispatch(changeProductStatus({ productId: id, status: 'approved'}))
	}

	rejectProduct(id: string): void {
		this.store.dispatch(changeProductStatus({ productId: id, status: 'rejected'}))
	}
}