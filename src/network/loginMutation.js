import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useAuthToken } from "../config/auth";

export const loginMutationGQL = gql`
  mutation loginUsingPassword($username: String!, $password: String!) {
    loginUsingPassword(input: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const useLoginMutation = () => {
  const [_, setAuthToken, removeAuthtoken] = useAuthToken();
  console.log("useLoginMutation");
  const [mutation, mutationResults] = useMutation(loginMutationGQL, {
    onCompleted: (data) => {
        console.log("result data---",data);
      setAuthToken(data.login.accessToken);
    }
  });

  // full login function
  const login = (user, password) => {
      console.log("LOGIN");
      console.log(user);
      console.log(password);
    removeAuthtoken();
    return mutation({
      variables: {
        login: user,
        password,
      },
    });
  }
  return [login, mutationResults]
};