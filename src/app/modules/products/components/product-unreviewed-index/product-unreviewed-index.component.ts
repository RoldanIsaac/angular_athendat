import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ProductService } from '../../product.service';
import { changeProductStatus } from '../../states/product.action';
import * as ProductActions from "../.././states/product.action"
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Product } from '../../states/product.model';
import { selectAllAPIProducts, selectProductError, selectProductLoading } from '../../states/product.selector';
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

	currentSelectedProducts: { id: string, status: 'approved' | 'rejected' }[] = [];
	
	constructor(
		private store: Store
	) {
		this.store.dispatch(ProductActions.loadApiProducts())
		this.products$ = this.store.select(selectAllAPIProducts);
		this.isLoading = this.store.select(selectProductLoading);
		this.error = this.store.select(selectProductError);
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

	private updateProductStatus(productId: string, status: 'approved' | 'rejected'): void {
		const product = this.currentSelectedProducts.find(_product => _product.id === productId);
		
		if (!product) {
			this.currentSelectedProducts.push({ id: productId, status });
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
		// this.store.dispatch(changeProductStatus({ productId: id, status: 'rejected'}))
	}

	approveProduct(product: { id: string }): void {
		this.updateProductStatus(product.id, 'approved');
	}
	
	rejectProduct(product: { id: string }): void {
		this.updateProductStatus(product.id, 'rejected');
	}
}