import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useAuthToken } from "../config/auth";

export const loginMutationGQL = gql`
  mutation loginUsingPassword($username: Email!, $password: Secret!) {
    loginUsingPassword(username: $username, password: $password) {
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
      setAuthToken(data.loginUsingPassword.accessToken);
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
        username: user,
        password:password,
      },
    });
  }
  return [login, mutationResults]
};