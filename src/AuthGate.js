import React from "react";
import { useUserQuery } from "./network/userQuery";
import Private from "./pages/Private";
import AuthenticationForm from "./pages/AuthenticationForm";
import { useAuthToken } from "./config/auth";

export const AuthGate = () => {

    console.log("auth gate");

  const [authToken] = useAuthToken()
  const userData = useUserQuery();
  console.log("userData--",userData);
  console.log("authToken--",authToken);
  if (userData.data && authToken) {
    return <Private user={userData.data.me} />;
  }
  return <AuthenticationForm loading={userData.loading} />;
};