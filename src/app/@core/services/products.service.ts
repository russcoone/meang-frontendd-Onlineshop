import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { ApiService } from '@graphql/service/api.service';
import { ACTIVE_FILTERS } from '@core/constants/filter';
import {
  SHOP_LAST_UNITS_OFFERS,
  SHOP_PRODUCT_BY_PLATFORM,
} from '@graphql/operations/query/shop-product';
import { map } from 'rxjs/operators';
import { IProduct } from 'projects/shop-ui/src/lib/interfaces';
import { HOME_PAGE } from '@graphql/operations/query/home-page';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  getHomePage() {
    return this.get(HOME_PAGE, {
      showPlatform: true,
    }).pipe(
      map((result: any) => {
        console.log('Home Page', result);
        return {
          carousel: result.carousel,
          tenisdemujer: this.manageInfo(
            result.tenisdemujer.shopProducts,
            false
          ),
          tenisdehombre: this.manageInfo(
            result.tenisdehombre.shopProducts,
            false
          ),
          tenisdenino: this.manageInfo(result.tenisdenino.shopProducts, false),
          tenisdenina: this.manageInfo(result.tenisdenina.shopProducts, false),
          topPrice: this.manageInfo(result.topPrice1500.shopProducts, true),
        };
      })
    );
  }

  getByPlatform(
    page: number = 1,
    itemsPage: number = 10,
    active: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE,
    random: boolean = false,
    platform: Array<string> = ['-1'],
    showInfo: boolean = false,
    showPlatform: boolean = false
  ) {
    return this.get(SHOP_PRODUCT_BY_PLATFORM, {
      page,
      itemsPage,
      active,
      random,
      platform,
      showInfo,
      showPlatform,
    }).pipe(
      map((result: any) => {
        const data = result.shopProductsPlatforms;
        return {
          info: data.info,
          result: this.manageInfo(data.shopProducts),
        };
      })
    );
  }
  getByLastUnitsOffers(
    page: number = 1,
    itemsPage: number = 4,
    active: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE,
    random: boolean = false,
    topPrice: number = -1,
    lastUnits: number = -1,
    showInfo: boolean = false,
    showPlatform: boolean = false
  ) {
    return this.get(SHOP_LAST_UNITS_OFFERS, {
      page,
      itemsPage,
      active,
      random,
      topPrice,
      lastUnits,
      showInfo,
      showPlatform,
    }).pipe(
      map((result: any) => {
        const data = result.shopProductsOffersLast;
        return {
          info: data.info,
          result: this.manageInfo(data.shopProducts),
        };
      })
    );
  }
  private manageInfo(listProducts: any, showDescription = true) {
    const resultList: Array<IProduct> = [];
    listProducts.map((shopObject) => {
      resultList.push({
        id: shopObject.id,
        img: shopObject.product.img,
        name: shopObject.product.name,
        rating: shopObject.product.rating,
        description:
          shopObject.platform && showDescription
            ? shopObject.platform.name
            : '',
        qty: 1,
        price: shopObject.price,
        stock: shopObject.stock,
      });
    });
    return resultList;
  }
}
