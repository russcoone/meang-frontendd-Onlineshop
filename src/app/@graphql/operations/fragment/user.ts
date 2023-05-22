import gql from 'graphql-tag';
import { NavbarComponent } from '@shop-core/components/navbar/navbar.component';

export const USER_FRAGMENT = gql`
  fragment UserObject on User {
    id
    name
    lastname
    password @include(if: $include)
    email
    registerDate @include(if: $include)
    birthday @include(if: $include)
    role
  }
`;
