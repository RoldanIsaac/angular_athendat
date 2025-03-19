import { ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, viewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject, Observable, take } from 'rxjs';
import { changeProductStatus } from '../../states/product.action';
import { Product } from '../../states/product.model';
import * as ProductActions from "../.././states/product.action"
import { selectAllStoredProducts, selectStoreProductLoading, selectStoreProductError } from '../../states/product.selector';
import { NgIf, AsyncPipe } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { DialogService } from '../../../../services/dialog.service';
import { DbProductState } from '../../states/product.reducer';

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
	@ViewChild('scrollContainer') scrollContainer!: ElementRef;
	_unsubscribeAll: Subject<any> = new Subject<any>();
	products$: Observable<Product[] | null>;
	isLoading$: Observable<boolean>;
	error!: Observable<string | null>;
	detailsDialog = ProductDetailsComponent;

	page: number = 1;
	limit: number = 7;

	constructor(
		private store: Store,
    	private _dialogService: DialogService,
		private _cdRef: ChangeDetectorRef,
	) { }

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle Hooks
	// -----------------------------------------------------------------------------------------------------

	ngOnInit(): void {
		this.products$ = this.store.pipe(select(selectAllStoredProducts)); 
		this.isLoading$ = this.store.pipe(select(selectStoreProductLoading));
		this.error = this.store.pipe(select(selectStoreProductError));

		this.loadProducts();
	}

	ngAfterViewInit(): void {
		this.scrollContainer.nativeElement.addEventListener('scroll', this.onScroll.bind(this));
	 }

	ngOnDestroy(): void {
		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete()
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public Methods
	// -----------------------------------------------------------------------------------------------------

	loadProducts(): void {
		this.store.dispatch(ProductActions.loadStoredProducts({ page: this.page, limit: this.limit }));
		this.page++;
		this._cdRef.detectChanges();
	}
	
	/**
	 * @description
	 */
	approveProduct(id: string): void {
		this.store.dispatch(changeProductStatus({ productId: id, status: 'approved'}))
	}

	/**
	 * @description
	 */
	rejectProduct(id: string): void {
		this.store.dispatch(changeProductStatus({ productId: id, status: 'rejected'}))
	}
  	
	/**
	 * @description
	 */
	openDetailsDialog(product: Product) {
		this._dialogService.openModal(this.detailsDialog, product);
	}

	/**
	 * @description
	 */
	deleteProduct(product: Product) {
		this.store.dispatch(ProductActions.deleteProduct({ productId: product.id }));
	}

	/**
	 * @description
	 * Lazy loading | Infinite Scroll
	 */
	onScroll(event: any): void {
		const container = event.target as HTMLElement;
		// const container = event.target;
		const isBottom = container.scrollHeight === container.scrollTop + container.clientHeight;
		if (isBottom) this.loadProducts();
	}
}
