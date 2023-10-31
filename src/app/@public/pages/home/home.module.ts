import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CarouselItemsModule } from 'projects/shop-ui/src/public-api';
import { ProductCategoryListModule } from '@core/components/product-category-list/product-category-list.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        CarouselItemsModule,
        ProductCategoryListModule
    ]
})
export class HomeModule {}
