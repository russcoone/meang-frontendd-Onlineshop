import { Component, Input } from '@angular/core';
import { IProduct } from 'projects/shop-ui/src/lib/interfaces/product.interface';
import { CURRENCIES_SYMBOL } from 'projects/shop-ui/src/public-api';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss']
})
export class ProductCategoryListComponent {
  @Input() title = 'Titulo de la categoria';
  @Input() productsList: Array<IProduct> = [];
  @Input() description = '';
  @Input() selectCurrency = CURRENCIES_SYMBOL.USD;

  constructor() { }
  
  addToCart($event: IProduct){
    console.log('Add to cart', $event);
  }
  showProductDetails($event: IProduct) {
    console.log('Show product details', $event);
  }


}
