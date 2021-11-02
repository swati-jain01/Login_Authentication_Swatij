import { useForm } from "react-hook-form";
import React from "react";
import { useLoginMutation } from "../network/loginMutation";

const AuthenticationForm = ({ loading }) => {
  const [loginMutation, loginMutationResults] = useLoginMutation();
  const { handleSubmit, register } = useForm();

  const disableForm = loginMutationResults.loading || loading;

  const onSubmit = (values) =>{

    loginMutation(values.username, values.password);

  }

  return (
    <div style={{ margin: "auto", padding: "100px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input name="username" {...register("username")}  />
        </div>
        <div>
          <input name="password" type="password" {...register("password")} />
        </div>
        <button type="submit" disabled={disableForm}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AuthenticationForm;