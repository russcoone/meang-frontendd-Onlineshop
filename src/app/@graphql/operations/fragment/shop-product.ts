import { NavbarComponent } from './../../../@public/core/components/navbar/navbar.component';
import { IMeData } from './../../../@core/interfaces/session.interface';
import gql from 'graphql-tag';

export const SHOP_PRODUCT_FRAGMENT = gql`
  fragment ShopProductObject on ShopProduct {
    id
    price
    stock
    product {
      name
      img
      rating {
        value
        count
      }
    }
    platform @include(if: $showPlatform) {
      id
      name
      slug
    }
  }
`;
