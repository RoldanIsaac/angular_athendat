import { Injectable } from '@angular/core';
import { Product } from '../states/product.model';

@Injectable({
  providedIn: 'root'
})
export class AdapterService {

  adapt(productData: any): Product {
    // MockAPI response structure:
    // {
    //   id: '1',
    //   name: 'Product 1',
    //   description: 'A great product',
    //   price: 100,
    // }
    return {
      id: productData.id,
      name: productData.name,
      serial: productData.serial,
      category: productData.category,
      weight: `${Math.floor(Math.random() * 10)} kgs`,
      stock: Math.floor(Math.random() * 10),
      description: productData.description,
      price: productData.price,
      status: 'pending',
    };
  }

  adaptList(productDataList: any[]): Product[] {
    return productDataList.map(productData => this.adapt(productData));
  }
}
