import { gql } from "@apollo/client";

export const LOAD_LOCATIONS = gql`
  query LocationsQuery($page: Int) {
    locations(page: $page) {
      info {
        count
        pages
      }
      results {
        id
        name
        type
        dimension
      }
    }
  }
`;
