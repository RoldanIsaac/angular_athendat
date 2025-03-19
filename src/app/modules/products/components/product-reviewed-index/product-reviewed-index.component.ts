import { ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, viewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject, Observable, take, takeUntil } from 'rxjs';
import { changeProductStatus } from '../../states/product.action';
import { Product } from '../../states/product.model';
import * as ProductActions from "../.././states/product.action"
import { selectAllStoredProducts, selectStoreProductLoading, selectStoreProductError } from '../../states/product.selector';
import { NgIf, AsyncPipe, NgFor } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { DialogService } from '../../../../services/dialog.service';
import { DbProductState } from '../../states/product.reducer';
import { ProductService } from '../../product.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-reviewed-index',
	imports: [
		NgFor,
		NgIf,
		AsyncPipe,
		MatTooltipModule,
		ProductCardComponent,
    	ProductDetailsComponent,
		MatSelectModule,
		MatFormFieldModule,
		MatIconModule,
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

	currentStatus: string = '';

	page: number = 1;
	limit: number = 7;
	noMoreProducts: boolean = false;

	iconsUrl = "icons/round-stroke"
	isIcon: boolean = false;
	actionIconNames = [
	  'clean',
	]
 
	positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];

	constructor(
		private _productService: ProductService,
		private store: Store,
    	private _dialogService: DialogService,
		private _cdRef: ChangeDetectorRef,
		private _matIconRegistry: MatIconRegistry,
		private _domSanitizer: DomSanitizer
	) { }

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle Hooks
	// -----------------------------------------------------------------------------------------------------

	ngOnInit(): void {
		this.products$ = this.store.pipe(select(selectAllStoredProducts)); 
		this.isLoading$ = this.store.pipe(select(selectStoreProductLoading));
		this.error = this.store.pipe(select(selectStoreProductError));

		this.loadProducts();

		// Track if there is no more products on the db
		this._productService.noMoreProducts$
		.pipe(
			takeUntil(this._unsubscribeAll)
		)
		.subscribe((value) => {
			this.noMoreProducts = value;
		})

		// Registering Icons
		for (let index = 0; index < this.actionIconNames.length; index++) {
			const iconName = this.actionIconNames[index];
			
			this._matIconRegistry.addSvgIcon(iconName, 
					this._domSanitizer.bypassSecurityTrustResourceUrl(`${this.iconsUrl}/${iconName}.svg`)
			);
		}
		this.isIcon = true
	}

	ngAfterViewInit(): void {
		this.scrollContainer.nativeElement.addEventListener('scroll', this.onScroll.bind(this));
	 }

	ngOnDestroy(): void {
		// Restore no more products value
		this._productService.noMoreProducts = false;

		// Restore products in store to 7
		this.store.dispatch(ProductActions.restoreStoreProducts());

		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete()
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

	onStatusChange(event: any): void {
		console.log('Selected Status:', this.currentStatus); 
	}

	clearFilters() {
		this.currentStatus = '';
	}
	 
	/**
	 * @description
	 * Load stored products in db by dispatching a store action with current page and product limit
	 */
	loadProducts(): void {
		this.store.dispatch(ProductActions.loadStoredProducts({ page: this.page, limit: this.limit }));
		this._cdRef.detectChanges();
	}
	
	// /**
	//  * @description
	//  * Approve the product by changing its status to 'approved' and dispatching an action 
 	//  * to update the state in the store.
	//  */
	// approveProduct(id: string): void {
	// 	this.store.dispatch(changeProductStatus({ productId: id, status: 'approved'}))
	// }

	// /**
	//  * @description
	//  * Reject the product by changing its status to 'rejected' and dispatching an action 
   //  * to update the state in the store.
	//  */
	// rejectProduct(id: string): void {
	// 	this.store.dispatch(changeProductStatus({ productId: id, status: 'rejected'}))
	// }
  	
	/**
	 * @description
	 * Open a modal dialog to show the product details.
	 */
	openDetailsDialog(product: Product) {
		this._dialogService.openModal(this.detailsDialog, product);
	}

	/**
	 * @description
	 * Delete the product from the database by dispatching an action to remove it.
	 */
	deleteProduct(product: Product) {
		this.store.dispatch(ProductActions.deleteDbProduct({ productId: product.id }));
	}

	/**
	 * @description
	 * Lazy loading | Infinite Scroll
	 */
	onScroll(event: any): void {
		const container = event.target as HTMLElement;
		// const container = event.target;
		const isBottom = container.scrollHeight === container.scrollTop + container.clientHeight;
		if (isBottom && !this.noMoreProducts) {
			this.page++;
			this.loadProducts()
		};
	}
}
