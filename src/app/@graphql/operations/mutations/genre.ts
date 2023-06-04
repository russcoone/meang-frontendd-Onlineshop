import gql from 'graphql-tag';
import { GENRE_FRAGMENT } from '@graphql/operations/fragment/genre';

export const ADD_GENRE = gql`
  mutation insertarGenero($genre: String!) {
    addGenre(genre: $genre) {
      status
      message
      genre {
        ...GenreObject
      }
    }
  }
  ${GENRE_FRAGMENT}
`;

export const MODIFY_GENRE = gql`
  mutation modificarGenro($id: ID!, $genre: String!) {
    updateGenre(id: $id, genre: $genre) {
      status
      message
      genre {
        ...GenreObject
      }
    }
  }
  ${GENRE_FRAGMENT}
`;
