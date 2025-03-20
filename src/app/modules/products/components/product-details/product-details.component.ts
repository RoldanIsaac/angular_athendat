import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Product } from '../../states/product.model';
import { CurrencyPipe, NgIf } from '@angular/common';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-product-details',
  imports: [
    CurrencyPipe,
    NgIf,
    MatTooltipModule,
    MatDialogModule,
    MatDividerModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  private readonly _matDialog = inject(MAT_DIALOG_DATA)
  product: Product = null;

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];

  ngOnInit(): void {
    if (this._matDialog.data) { 
      this.product = this._matDialog.data;
    }
  }
}
