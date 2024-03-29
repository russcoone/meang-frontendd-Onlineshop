import gql from 'graphql-tag';
import { TAG_FRAGMENT } from '../fragment/tags';
import { RESULT_INFO_FRAGMENT } from '../fragment/result-info';

export const TAG_LIST_QUERY = gql`
  query tagsList($page: Int, $itemsPage: Int) {
    tags(page: $page, itemsPage: $itemsPage) {
      info {
        ...ResultInfoObject
      }
      status
      message
      tags {
        ...TagObject
      }
    }
  }
  ${TAG_FRAGMENT}
  ${RESULT_INFO_FRAGMENT}
`;
