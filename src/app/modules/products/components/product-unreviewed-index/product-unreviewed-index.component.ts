import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { changeProductStatus } from '../../states/product.action';
import * as ProductActions from "../.././states/product.action"
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Product } from '../../states/product.model';
import { selectAllAPIProducts, selectApiProductError, selectApiProductLoading } from '../../states/product.selector';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
	selector: 'app-product-unreviewed-index',
	imports: [
		NgIf,
		NgFor,
		AsyncPipe,
		ProductCardComponent,
		NgClass,
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
		private store: Store,
		private _cdRef: ChangeDetectorRef,
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

	/**
	 * @description
	 * Using the product id as unique identifier
	 */
	trackByProductId(index: number, product: any): number {
		return product.id; 
	}

	/**
	 * @description
	 * For each product classified, store in db and remove from API list´s products
	 */
	dispatchProducts(): void {
		// console.log(this.currentSelectedProducts);
		this.currentSelectedProducts.forEach((product) => {
			// console.log(product)
			// Store the selected products
			this.store.dispatch(ProductActions.storeProduct({ product: product }))

			// Remove from the current api products
			this.store.dispatch(ProductActions.deleteApiProduct({ productId: product.id }))

			// Unmark bug
			this._cdRef.detectChanges();
		})

		this.currentSelectedProducts = [];
	}

	/**
	 * @description
	 */
	approveProduct(product: Product): void {
		this.updateProductStatus(product, 'approved');
	}

	/**
	 * @description
	 */
	rejectProduct(product: Product): void {
		this.updateProductStatus(product, 'rejected');
	}
}