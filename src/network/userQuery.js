import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";


const userQueryGQL = gql`
 query me {
  users{
    firstName
  }
}
`;
export const useUserQuery = () => useQuery(userQueryGQL);