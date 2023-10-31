import { Component, OnInit } from '@angular/core';
import { ICarouselItem } from 'projects/shop-ui/src/lib/interfaces/carousel-item.interface';
import { CURRENCIES_SYMBOL } from 'projects/shop-ui/src/lib/constants/currencies.enum';
import { ProductsService } from '@core/services/products.service';
import { ACTIVE_FILTERS } from '@core/constants/filter';
import { UsersService } from '@core/services/users.service';
import { IProduct } from 'projects/shop-ui/src/lib/interfaces/product.interface';
// import carouselItems from '@data/carousel.json'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cartCountElements = 0;
  cartItems = [];
  selectCurrency = CURRENCIES_SYMBOL.USD;
  items: ICarouselItem[] = [];
  productsList: IProduct[] = [];
  listOne;
  listTwo;
  listthree;
  constructor(private products: ProductsService, private usersApi: UsersService) {}

  ngOnInit(): void {
    this.products
      .getByLastUnitsOffers(1, 5, ACTIVE_FILTERS.ACTIVE, true, 2000)
      .subscribe((result) => {
        console.log('productos a menos de 2000', result);
        this.listTwo = result;
      });
    this.products
      .getByPlatform(1, 3, ACTIVE_FILTERS.ACTIVE, true, '1')
      .subscribe((result) => {
        console.log('productos por plataforma', result);
         this.listOne = result;
      });

      // this.items = carouselItems

       this.products
         .getByLastUnitsOffers(1, 3, ACTIVE_FILTERS.ACTIVE, false, -1 )
         .subscribe((result: IProduct[]) => {
          result.map((item: IProduct) => {
             this.items.push({
               id: item.id,
               title: item.name,
               description: item.description,
               url: '',
              background: item.img,

             });
           });
       });
      
  }
}
