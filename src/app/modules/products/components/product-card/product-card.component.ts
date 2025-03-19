import { CurrencyPipe, JsonPipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { DialogService } from '../../../../services/dialog.service';
import { Product } from '../../states/product.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-card',
  imports: [
    NgIf,
    MatIconButton,
    MatTooltipModule,
    MatIconModule,
    JsonPipe,
    CurrencyPipe,
    MatCheckboxModule,
    FormsModule
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Input() parent!: 'reviewed' | 'unreviewed';

  @Output() detailsEmit = new EventEmitter(); 
  @Output() approveEmit = new EventEmitter(); 
  @Output() rejectEmit = new EventEmitter(); 
  @Output() deleteEmit = new EventEmitter();

  approve: boolean = false;
  reject: boolean = false;

  iconsUrl = "icons/round-stroke"
  isIcon: boolean = false;
  actionIconNames = [
    'delete-02',
    'pencil-edit-02',
  ]

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];

  constructor(
    private _dialogService: DialogService,
    private _matIconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer) {

    }

  ngOnInit(): void {
    // Registering Huge Icons
    for (let index = 0; index < this.actionIconNames.length; index++) {
      const iconName = this.actionIconNames[index];
      
      this._matIconRegistry.addSvgIcon(iconName, 
          this._domSanitizer.bypassSecurityTrustResourceUrl(`${this.iconsUrl}/${iconName}.svg`)
      );
    }
    this.isIcon = true
  }

  // ------------------------------------------------------------------------------------------
  // @ Public Methods
  // ------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------
  // @ Emitters
  // ------------------------------------------------------------------------------------------

  onDetails(product: Product) {
    this.detailsEmit.emit(product);
  }

  onApprove(product: Product) {
    this.reject = false;
    this.approveEmit.emit(product);
  }

  onReject(product: Product) {
    this.approve = false;
    this.rejectEmit.emit(product);
  }

  onDelete(product: Product) {
    this.deleteEmit.emit(product);
  }
}