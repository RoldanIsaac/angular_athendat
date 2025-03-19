import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ProductService } from '../../product.service';
import { changeProductStatus } from '../../states/product.action';
import * as ProductActions from "../.././states/product.action"
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Product } from '../../states/product.model';
import { selectAllAPIProducts, selectApiProductError, selectApiProductLoading } from '../../states/product.selector';
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
	isLoading$: Observable<boolean>
	error!: Observable<string | null>

	currentSelectedProducts: Product[] = [];
	
	constructor(
		private store: Store
	) {
		this.store.dispatch(ProductActions.loadApiProducts())
		this.products$ = this.store.select(selectAllAPIProducts);
		this.isLoading$ = this.store.select(selectApiProductLoading);
		this.error = this.store.select(selectApiProductError);
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle Hooks
	// -----------------------------------------------------------------------------------------------------

	ngOnInit(): void {
	
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete()
	}


	// -----------------------------------------------------------------------------------------------------
	// @ Private Methods
	// -----------------------------------------------------------------------------------------------------

	private updateProductStatus(product: Product, status: 'approved' | 'rejected'): void {
		const isProduct = this.currentSelectedProducts.find(_product => _product.id === product.id);
		
		if (!isProduct) {
			this.currentSelectedProducts.push({ ...product, status });
		} else {
			const index = this.currentSelectedProducts.indexOf(product);
			this.currentSelectedProducts[index] = { ...product, status };
		}
	}


	// -----------------------------------------------------------------------------------------------------
	// @ Public Methods
	// -----------------------------------------------------------------------------------------------------

	dispatchProducts(): void {
		console.log(this.currentSelectedProducts);

		// Remove from the current api products
		// this.store.dispatch(changeProductStatus({ productId: id, status: }))

		// Store the selected products
		this.currentSelectedProducts.forEach((product) => {
			this.store.dispatch(ProductActions.storeProduct({ product: product }))
		})
	}

	approveProduct(product: Product): void {
		this.updateProductStatus(product, 'approved');
	}
	
	rejectProduct(product: Product): void {
		this.updateProductStatus(product, 'rejected');
	}
}